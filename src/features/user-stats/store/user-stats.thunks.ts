import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"
import { INIT_STATS } from "shared/constants"
import {
  DayData,
  FirestoreRefPath,
  Millisecond,
  Minute,
  DbStatsData
} from "shared/types"
import { serverStatsDataToStoreAdapter } from "shared/utils/adapters"
import { firestore } from "app/firebase-init"
import { statsActions } from "./user-stats.slice"
import { getFullRange } from "../utils/get-full-range"
import { FEAT_STATS } from "../user-stats.constants"
import { fetchDays } from "../api/fetch-days"
import { fetchStats } from "../api/fetch-stats"
import { roundToHundredth } from "shared/utils"
import { calcAverageSessionPerDay as calcAverageSessionPerDay } from "../utils/user-stats.utils"
import { sendUpdatedStats } from "../api/stats"
import { AppThunkAPI } from "app/store"
import { countMaxStreak, getNewMaxStreak } from "../utils/get-streak"

export const fetchStatsThunk = createAsyncThunk<void, User, AppThunkAPI>(
  `${FEAT_STATS}/fetchStats` as const,
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

      if (!statsData?.maxStreak) {
        const daysData = thunkAPI.getState().userStats.daysData
        statsData.maxStreak = countMaxStreak(daysData)
      }

      const setStatsAction = statsActions.setStats(statsData)
      thunkAPI.dispatch(setStatsAction)
    } catch (error) {
      console.error(error)
    }
  }
)

export const fetchActivityDataThunk = createAsyncThunk(
  `${FEAT_STATS}/fetchActivityData` as const,
  async (userId: string, thunkAPI) => {
    const daysWithSessions = await fetchDays(userId, firestore)
    const shallowDaysWithSessions = daysWithSessions.map(d => ({
      ...d,
      timestamp: d.timestamp.toMillis() as Millisecond,
      statsRef: d.statsRef?.path as FirestoreRefPath
    }))

    const daysDataFullRange = getFullRange(shallowDaysWithSessions)

    const setChartDataAction = statsActions.setActivityData(daysDataFullRange)
    thunkAPI.dispatch(setChartDataAction)
  }
)

interface Payload {
  dayData: DayData
  userId: string
}
export const sendUserStatsThunk = createAsyncThunk<void, Payload, AppThunkAPI>(
  `${FEAT_STATS}/sendStats` as const,
  // eslint-disable-next-line max-statements
  async ({ dayData, userId }: { dayData: DayData; userId: string }, thunkAPI) => {
    const stats = thunkAPI.getState().userStats.stats
    const statsId = stats?.statsId as FirestoreRefPath

    const { totalDuration, count, firstSessionDate, maxStreak, streak, displayName } =
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

    const newMaxStreak = getNewMaxStreak(streak, maxStreak)

    const newUserStats: DbStatsData = {
      userId: dayData.userId,
      count: count + 1,
      maxStreak: newMaxStreak,
      totalDuration: newTotalDuration,
      firstSessionDate: Timestamp.fromMillis(firstSessionDate),
      averageDuration: newAverageDuration,
      updatedAt: Date.now() as Millisecond,
      displayName,
    }

    try {
      await sendUpdatedStats(userId, newUserStats, statsId)
      const newUserStatsState = serverStatsDataToStoreAdapter(newUserStats, statsId)

      thunkAPI.dispatch(statsActions.setStats(newUserStatsState))
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
