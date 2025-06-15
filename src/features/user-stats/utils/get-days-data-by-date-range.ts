import { startOfYear, startOfQuarter, parseISO, endOfYear } from "date-fns"
import { DateRange, YearString } from "features/settings/settings.types"
import { DayData, Millisecond, PseudoDayData } from "shared/types"

export const getDaysDataByDateRange = (
  userDaysData: DayData[],
  dateRange: DateRange | YearString
) => {
  if (dateRange === DateRange.AllTime) return userDaysData

  if (dateRange === DateRange.Year) {
    const startDate = startOfYear(Date.now())
    const daysData = userDaysData.filter(
      ({ timestamp }) => timestamp >= startDate.getTime()
    )
    return daysData
  }

  if (dateRange === DateRange.Quarter) {
    const startDate = startOfQuarter(Date.now())
    const daysData = userDaysData.filter(
      ({ timestamp }) => timestamp >= startDate.getTime()
    )
    return daysData
  }

  if (dateRange.match(/^\d{4}$/)) {
    const yearDate = parseISO(`${dateRange}-01-01`)
    const startDate = startOfYear(yearDate)
    const endDate = endOfYear(yearDate)
    const daysData = userDaysData.filter(
      ({ timestamp }) =>
        timestamp >= startDate.getTime() && timestamp < endDate.getTime()
    )
    return daysData
  }

  return userDaysData
}
