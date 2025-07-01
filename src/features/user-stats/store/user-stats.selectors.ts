import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import { countMaxStreak, countStreak } from "../utils/get-streak"
import { getDaysDataByDateRange } from "../utils/get-days-data-by-date-range"
import {
  getAverageCountPerDay,
  calcAverageSessionPerDay
} from "../utils/user-stats.utils"
import { DateRange, YearString } from "features/settings/settings.types"
import { Hour, Minute } from "shared/types"
import { MINS_IN_HOUR } from "shared/constants"
import { roundToTenth } from "shared/utils"
import { calcTotalDuration } from "../utils/count-total-duration"

export const selectUserStats = (state: RootState) => state.userStats.stats
export const selectDaysData = (state: RootState) => state.userStats.daysData
export const selectIsLoading = (state: RootState) =>
  state.userStats.status === "loading"

export const selectDateRange = (state: RootState) => state.userStats.dateRange
export const selectDaysByDateRange = createSelector(
  [selectDaysData, selectDateRange],
  (days, dateRange) => getDaysDataByDateRange(days, dateRange)
)
export const selectActiveDays = createSelector(selectDaysByDateRange, days =>
  days.filter(d => d.sessions.length > 0 || d.totalDuration > 0)
)

const { AllTime, Quarter, Year } = DateRange
export const selectStreak = createSelector(
  [selectDaysByDateRange, selectDateRange],
  (days, dateRange) =>
    checkForCurrentYear(dateRange) ? countStreak(days) : null
)
export const selectMaxStreak = createSelector(
  [
    (state: RootState) => state.userStats.stats?.maxStreak || null,
    selectActiveDays
  ],
  (maxStreak, days) =>
    maxStreak
      ? isNaN(maxStreak)
        ? countMaxStreak(days)
        : maxStreak
      : countMaxStreak(days)
)

export const selectFirstSessionDate = (state: RootState) =>
  state.userStats.stats?.firstSessionDate || null

export const selectFirstSessionDateByRange = createSelector(
  [
    (state: RootState) => state.userStats.stats?.firstSessionDate || null,
    selectDaysByDateRange
  ],
  (firstSessionDate, days) =>
    days.find(d => d.sessions.length > 0)?.timestamp ?? null
)

export const selectTotalDuration = createSelector(
  [selectUserStats, selectDaysByDateRange, selectDateRange],
  (stats, days, range) => {
    return range === DateRange.AllTime
      ? (stats?.totalDuration ?? (0 as Minute))
      : calcTotalDuration(days)
  }
)

export const selectAverageCount = createSelector(
  [
    (state: RootState) => state.userStats.stats?.averageCount ?? null,
    selectDaysByDateRange
  ],
  (count, days) => count ?? getAverageCountPerDay(days)
)

export const selectAverageDuration = createSelector(
  [selectFirstSessionDateByRange, selectTotalDuration],
  (firstSessionDate, totalDuration) =>
    firstSessionDate
      ? calcAverageSessionPerDay(firstSessionDate, totalDuration)
      : null
)

export const selectTotalHours = createSelector(selectTotalDuration, total => {
  return roundToTenth<Hour>((total / MINS_IN_HOUR) as Hour)
})

function checkForCurrentYear(dateRange: DateRange | YearString): boolean {
  return [AllTime, Quarter, Year].includes(
    dateRange as DateRange // TODO: rewrite a WORKAROUND
  )
}
