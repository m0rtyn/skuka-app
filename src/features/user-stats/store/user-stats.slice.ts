import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DayData, Minute, UserStatsData } from "shared/types"
import { FEATURE_NAME } from "../user-stats.constants"
import { fetchChartDataThunk, fetchStatsThunk } from "./user-stats.thunks"
import { DateRange, YearString } from "features/settings/settings.types"
import { generateFakeDayData } from "../utils/generate-fake-day-data"

export interface UserStatsState {
  daysData: DayData[]
  stats: UserStatsData | null
  status: "idle" | "loading" | "error" | "loaded"
  errorMessage: string | null
  dateRange: DateRange | YearString
}

const initialState: UserStatsState = {
  daysData: [],
  stats: null,
  status: "idle",
  errorMessage: null,
  dateRange: DateRange.AllTime
}

export const userStatsSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    addDay: (state, action: PayloadAction<DayData>) => {
      state.daysData.push(action.payload)
    },
    updateDay: (
      state,
      action: PayloadAction<{ dayData: DayData; index: number }>
    ) => {
      const { dayData, index } = action.payload
      state.daysData[index] = dayData
    },
    setStats: (state, action: PayloadAction<UserStatsData>) => {
      state.stats = action.payload
    },
    setDaysData: (state, action: PayloadAction<DayData[]>) => {
      // state.daysData = generateFakeDayData()
      state.daysData = action.payload
    },
    setAverageDuration: (state, action: PayloadAction<Minute>) => {
      if (!state.stats) throw new Error("Stats are not set")
      state.stats.averageDuration = action.payload
    },
    setMaxStreak: (state, action: PayloadAction<number>) => {
      if (!state.stats) throw new Error("Stats are not set")
      state.stats.maxStreak = action.payload
    },
    setDateRange: (state, action: PayloadAction<DateRange | YearString>) => {
      if (!state.stats) throw new Error("Stats are not set")
      state.dateRange = action.payload
    },
    toggleDateRange: state => {
      if (!state.stats) throw new Error("Stats are not set")
      const newDateRange =
        state.dateRange === DateRange.AllTime ?
          DateRange.Year
        : DateRange.AllTime
      state.dateRange = newDateRange
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchStatsThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchStatsThunk.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(fetchStatsThunk.rejected, (state, action) => {
        state.status = "error"
      })
      .addCase(fetchChartDataThunk.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchChartDataThunk.fulfilled, (state, action) => {
        state.status = "loaded"
      })
      .addCase(fetchChartDataThunk.rejected, (state, action) => {
        console.error(action.error)
        state.status = "error"
        state.errorMessage = action.error.message ?? null
      })
  }
})

// Action creators are generated for each case reducer function
export const statsActions = {
  ...userStatsSlice.actions
}

export const userStatsSliceReducer = userStatsSlice.reducer
