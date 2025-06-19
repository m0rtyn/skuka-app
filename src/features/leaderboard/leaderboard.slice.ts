import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LeaderboardData, LeaderboardState } from "./leaderboard.types"
import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where
} from "firebase/firestore"
import { firestore } from "app/firebase-init"
import { Minute, ServerDayData } from "shared/types"
import { MILLIS_IN_QUARTER } from "shared/constants"
import { getUserNicknameFromId } from "./leaderboard.utils"

export const fetchLeaderboardData = createAsyncThunk<
  LeaderboardData[],
  void,
  { rejectValue: string }
>("leaderboard/fetchData", async (_, thunkApi) => {
  try {
    const daysColRef = collection(firestore, "days") as CollectionReference<
      ServerDayData,
      ServerDayData
    >
    const quarterBefore = Timestamp.fromMillis(Date.now() - MILLIS_IN_QUARTER)
    const daysQuery = query(
      daysColRef,
      where("timestamp", ">=", quarterBefore),
      orderBy("timestamp", "desc")
    )
    const daysColSnapshot = await getDocs(daysQuery)
    const daysWithSessions = daysColSnapshot.docs.map(snap => snap.data())

    const leaderboardMap = daysWithSessions.reduce((acc, day) => {
      const doesUserExist = acc.has(day.userId)
      const leaderboardData = {
        userId: day.userId,
        count: day.count || day.sessions.length || 0,
        totalDuration: day.totalDuration || 0,
        displayName: null,
        lastSessionTime: null
      }
      if (!doesUserExist) acc.set(day.userId, leaderboardData)
      else {
        const accDay = acc.get(day.userId)
        if (!accDay) return acc
        const { count, total, lastTime } = countTotalsForExistingDay(
          accDay,
          day
        )
        accDay.totalDuration = total as Minute
        accDay.count = count
        accDay.displayName =
          accDay.displayName || getUserNicknameFromId(leaderboardData.userId)
        accDay.lastSessionTime = lastTime
      }
      return acc
    }, new Map<string, LeaderboardData>())

    const leaderboard = Array.from(leaderboardMap.values())
      .toSorted((a, b) => b.totalDuration - a.totalDuration)
      .slice(0, 9)
    return leaderboard
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message)
  }
})

function countTotalsForExistingDay(
  accDay: LeaderboardData,
  day: ServerDayData
) {
  const total = accDay.totalDuration || 0
  const count = accDay.count || 0
  const lastTime = 0

  const newTotal = (total + day.totalDuration ||
    total + day.sessions.reduce((a, d) => a + d.duration, 0)) as Minute
  const newCount = (accDay.count =
    day.count + count || count + day.sessions.reduce(a => a + 1, 0))
  const newLastTime = day.sessions.reduce(
    (a, d) => Math.max(a, new Date(d.timestamp).getTime()),
    lastTime
  )

  return { count: newCount, total: newTotal, lastTime: newLastTime }
}

const initialState: LeaderboardState = {
  leaderboard: [] as LeaderboardData[],
  status: "idle",
  error: null
}

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLeaderboardData.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.leaderboard = action.payload
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  }
})

export default leaderboardSlice.reducer
