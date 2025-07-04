import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"
import { INIT_STATS } from "shared/constants"
import {
  DayData,
  FirestoreRefPath,
  Millisecond,
  Minute,
  ServerUserStatsData
} from "shared/types"
import { serverStatsDataToStoreAdapter } from "shared/utils/adapters"
import { firestore } from "app/firebase-init"
import { statsActions } from "./user-stats.slice"
import { getFullRange } from "../utils/get-full-range"
import { FEATURE_NAME } from "../user-stats.constants"
import { fetchDays } from "../api/fetch-days"
import { fetchStats } from "../api/fetch-stats"
import { roundToHundredth } from "shared/utils"
import { calcAverageSessionPerDay as calcAverageSessionPerDay } from "../utils/user-stats.utils"
import { sendStats } from "../api/stats"
import { ThunkAPI } from "app/store"

export const fetchStatsThunk = createAsyncThunk(
  `${FEATURE_NAME}/getStats` as const,
  // eslint-disable-next-line max-statements
  async (user: User, thunkAPI) => {
    try {
      const statsData = await fetchStats(user.uid, firestore)

      if (!statsData) return thunkAPI.rejectWithValue(null)

      if (!statsData?.averageDuration) {
        statsData.averageDuration = calcAverageSessionPerDay(
          statsData.firstSessionDate,
          statsData.totalDuration
        )
      }

      const setStatsAction = statsActions.setStats(statsData)
      thunkAPI.dispatch(setStatsAction)
    } catch (error) {
      console.error(error)
    }
  }
)

export const fetchActivityDataThunk = createAsyncThunk(
  `${FEATURE_NAME}/getChartData` as const,
  // TODO: refactor this method
  async (user: User, thunkAPI) => {
    const daysWithSessions = await fetchDays(user, firestore)
    const shallowDaysWithSessions = daysWithSessions.map(d => ({
      ...d,
      timestamp: d.timestamp.toMillis() as Millisecond,
      statsRef: d.statsRef?.path as FirestoreRefPath
    }))

    const daysDataFullRange = getFullRange(shallowDaysWithSessions)

    const setChartDataAction = statsActions.setDaysData(daysDataFullRange)
    thunkAPI.dispatch(setChartDataAction)
  }
)

interface Payload {
  dayData: DayData
  user: User
}
export const sendUserStatsThunk = createAsyncThunk<void, Payload, ThunkAPI>(
  `${FEATURE_NAME}/setUserStats` as const,
  // eslint-disable-next-line max-statements
  async ({ dayData, user }: { dayData: DayData; user: User }, thunkAPI) => {
    const stats = thunkAPI.getState().userStats.stats

    const { totalDuration, count, firstSessionDate, maxStreak, streak } =
      stats ?? INIT_STATS
    const newTotalDuration = roundToHundredth(
      (totalDuration +
        dayData.sessions.reduce(
          (acc, m) => (acc + m.duration) as Minute,
          0 as Minute
        )) as Minute
    )
    const newAverageDuration = calcAverageSessionPerDay(
      firstSessionDate,
      newTotalDuration
    )

    const newMaxStreak =
      dayData.sessions.length === 0 && maxStreak ?
        maxStreak // FIXME: this is a bug
      : Math.max(maxStreak, streak || 1)

    const newUserStats: ServerUserStatsData = {
      userId: dayData.userId,
      count: count + 1,
      maxStreak: newMaxStreak,
      totalDuration: newTotalDuration,
      firstSessionDate: Timestamp.fromMillis(firstSessionDate),
      averageDuration: newAverageDuration,
      updatedAt: Date.now() as Millisecond
    }

    try {
      await sendStats(user, newUserStats)
      const newUserStatsState = serverStatsDataToStoreAdapter(newUserStats)

      thunkAPI.dispatch(statsActions.setStats(newUserStatsState))
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
