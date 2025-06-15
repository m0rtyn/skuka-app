import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LeaderboardState, LeaderboardUser } from "./leaderboard.types"
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where
} from "firebase/firestore"
import { User } from "firebase/auth"
import { firestore } from "app/firebase-init"
import { ServerDayData } from "shared/types"

export const fetchLeaderboardData = createAsyncThunk<
  ServerDayData[],
  void,
  { rejectValue: string }
>("leaderboard/fetchData", async (_, thunkApi) => {
  try {
    const daysColRef = collection(firestore, "days")
    const quarterBefore = Timestamp.fromMillis(
      Date.now() - 1000 * 60 * 60 * 24 * 90
    )
    const daysQuery = query(
      daysColRef,
      where("timestamp", ">=", quarterBefore),
      orderBy("timestamp", "desc")
    )
    const daysColSnapshot = await getDocs(daysQuery)
    const daysWithSessions = daysColSnapshot.docs.map(snap =>
      snap.data()
    ) as ServerDayData[]

    const leaderboard = daysWithSessions.reduce((acc, day) => {
      if (!acc.has(day.userId)) acc.set(day.userId, day)
      else {
        const existingDay = acc.get(day.userId)
        if (!existingDay) return acc
        // FIXME: bad unfixed untested code
        existingDay.totalDuration +=
          day.sessions.reduce(
            (a, d) => ((existingDay.count += 1), a + d.duration),
            0
          ) || day.totalDuration
      }
      return acc
    }, new Map<string, ServerDayData>())

    return Array.from(leaderboard.values())
      .toSorted((a, b) => b.totalDuration - a.totalDuration)
      .slice(0, 9)
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message)
  }
})

const initialState: LeaderboardState = {
  users: [] as LeaderboardUser[],
  status: "idle",
  error: null
}

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLeaderboardData.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchLeaderboardData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchLeaderboardData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  }
})

export default leaderboardSlice.reducer
