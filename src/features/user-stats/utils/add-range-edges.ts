import {
  startOfYear,
  formatISO,
  startOfQuarter,
  parseISO,
  endOfYear
} from "date-fns"
import { DateRange, YearString } from "features/settings/settings.types"
import { Activity } from "react-activity-calendar"
import { DayData, Minute } from "shared/types"
import { roundToTenth } from "shared/utils"

export function addRangeEdges(
  activity: Activity[],
  dateRange: DateRange | YearString
): any {
  const pseudoDay = {
    date: "",
    count: 0,
    level: 0
  }
  const formatConfig = {
    format: "extended" as const,
    representation: "date" as const
  }

  if (dateRange === DateRange.AllTime) return activity

  if (dateRange === DateRange.Year) {
    const startDate = startOfYear(Date.now())
    pseudoDay.date = formatISO(startDate, formatConfig)
    return [pseudoDay, ...activity]
  }

  if (dateRange === DateRange.Quarter) {
    const startDate = startOfQuarter(Date.now())
    pseudoDay.date = formatISO(startDate, formatConfig)
    return [pseudoDay, ...activity]
  }

  if (dateRange.match(/^\d{4}$/)) {
    const yearDate = parseISO(`${dateRange}-01-01`)
    const startDate = startOfYear(new Date(yearDate))
    const endDate = endOfYear(new Date(yearDate))
    const start = { ...pseudoDay }
    start.date = formatISO(startDate, formatConfig)
    const end = { ...pseudoDay }
    end.date = formatISO(endDate, formatConfig)

    return [start, ...activity, end]
  }
}

export function getLevelByDuration(count: number) {
  return (
    count > 60 ? 4
    : count > 40 ? 3
    : count > 20 ? 2
    : count > 0 ? 1
    : 0
  )
}

export function mapDaysToActivity(daysData: DayData[]) {
  return daysData.map(({ timestamp, sessions, totalDuration }, i) => {
    const dayDuration =
      sessions.length > 0 ?
        sessions.reduce<Minute>(
          (a, m) => (a + m.duration) as Minute,
          0 as Minute
        )
      : (totalDuration as Minute)
    const count = roundToTenth<Minute>(dayDuration)
    const date = formatISO(timestamp, {
      format: "extended",
      representation: "date"
    })
    const level = getLevelByDuration(count)
    return { date, count, level }
  })
}
