/* eslint-disable max-lines */
import { DAYS_IN_MONTH, MILLIS_IN_DAY, MINS_IN_HOUR } from "shared/constants"
import { roundToTenth, roundToHundredth } from "shared/utils/round-to-nth"
import {
  DayData,
  Hour,
  Millisecond,
  Minute,
  MockDayData,
  SkukaChartData,
  UserStatsData
} from "shared/types"
import {
  INIT_TOTAL_DURATION,
  MAX_DAYS_DATA_LENGTH,
  PRACTICE_HOURS_PROGRESSION
} from "../user-stats.constants"
import { getForesightDaysData } from "./get-data"
import { format } from "date-fns"

export const getTotalInHours = (minutes: Minute): Hour => {
  return Math.floor(minutes / MINS_IN_HOUR) as Hour
}

export const calcAverageSessionPerDay = (
  firstSessionDate: Millisecond,
  totalDuration: Minute
) => {
  if (!firstSessionDate) throw new Error("there are no user statistics yet")

  const statsMillisecondsDiff = (Date.now() - firstSessionDate) as Millisecond
  const statsRangeInDays = Math.ceil(statsMillisecondsDiff / MILLIS_IN_DAY)
  const average = roundToTenth((totalDuration / statsRangeInDays) as Minute)

  return average
}

export const getMedianSessionDuration = (daysData: DayData[]): Minute => {
  const allDurations = daysData
    .flatMap(({ sessions }) =>
      sessions.length === 0 ?
        [0 as Minute]
      : sessions.map(session => session.duration)
    )
    .sort((a, b) => a - b)

  if (allDurations.length === 0) {
    return 0 as Minute
  }

  const mid = Math.floor(allDurations.length / 2)
  const median =
    allDurations.length % 2 !== 0 ?
      allDurations[mid]
    : (allDurations[mid - 1] + allDurations[mid]) / 2

  return median as Minute
}

export const getAverageCountPerDay = (dayDataList: DayData[]) => {
  if (dayDataList.length === 0) return null

  const daysCount = new Set(
    dayDataList.map(d => format(d.timestamp, "yyyy-MM-dd"))
  ).size

  const sessionCount = dayDataList
    .map(dayData => dayData.sessions.length)
    .reduce((acc, sessionCount) => sessionCount + acc, 0)
  const averageSessionCount = sessionCount / daysCount

  return roundToHundredth(averageSessionCount)
}

export function getTotalDurationsAsAxisData(
  acc: SkukaChartData[],
  dayData: SkukaChartData,
  index: number
) {
  const prevTotal = acc[index - 1]?.secondary || INIT_TOTAL_DURATION
  const newTotal = dayData.secondary / 60 + prevTotal
  const newData = {
    primary: dayData.primary,
    secondary: roundToHundredth(newTotal)
  }

  return [...acc, newData]
}

// TODO: add generic type for parameters
const cutDataRange = (daysData: (MockDayData | DayData | SkukaChartData)[]) => {
  const dataLength = daysData.length

  if (dataLength <= MAX_DAYS_DATA_LENGTH) {
    return daysData
  }

  const maxLengthDiff = dataLength - MAX_DAYS_DATA_LENGTH
  return daysData.slice(maxLengthDiff, dataLength)
}

export const getPseudoDayData = (
  index: number,
  lastTimestampMillis: Millisecond,
  averageSessionDuration: Minute
): MockDayData => ({
  timestamp: (lastTimestampMillis + (index + 1) * MILLIS_IN_DAY) as Millisecond,
  totalDuration: averageSessionDuration
})

export const getUserChartData = (
  userDaysData: DayData[],
  userStatistics: UserStatsData
) => {
  const foresightChartData =
    getForesightDaysData(userDaysData, userStatistics, DAYS_IN_MONTH) ?? []

  const accumulatedDuration = userDaysData.reduce((acc, day, i) => {
    const prevTotal = acc[i - 1]?.totalDuration || (0 as Minute)
    const newAcc: DayData[] = [
      ...acc,
      {
        ...day,
        totalDuration: (day?.totalDuration || 0 + prevTotal) as Minute,
        timestamp: day.timestamp as Millisecond
      }
    ]
    return newAcc
  }, [] as DayData[])

  return [userDaysData, foresightChartData, accumulatedDuration] as const
}

export const exportToCSV = (userDaysData: DayData[]) => {
  const csvContent =
    ["timestamp", "totalDuration", "count", "sessions"].join(";") +
    "\n" +
    userDaysData
      .map(day => {
        const dateString = new Date(day.timestamp).toISOString().slice(0, 10)
        const totalDuration = resolveTotalDuration(day)
        const count = resolveCount(day)
        const sessionsString = day.sessions
          .map(session => session.duration)
          .join(",")

        return [dateString, totalDuration, count, sessionsString].join(";")
      })
      .join("\n")
  const encodedUri = encodeURI("data:text/csv;charset=utf-8,\n" + csvContent)
  return encodedUri
}

function resolveTotalDuration(day: DayData) {
  return (
    !day.totalDuration ?
      day.sessions.length !== 0 ?
        day.sessions.reduce((acc, { duration }) => acc + duration, 0)
      : 0
    : day.count === 0 ?
      day.sessions.reduce((acc, { duration }) => acc + duration, 0)
    : day.totalDuration
  )
}

function resolveCount(day: DayData) {
  return (
    !day.count ?
      day.sessions.length !== 0 ?
        day.sessions.length
      : 0
    : day.totalDuration === 0 ? day.sessions.length
    : day.count
  )
}

export const getMilestoneProgress = (
  nextHoursMilestone: Hour,
  totalHours: Hour
) => {
  const previousMilestoneIndex =
    PRACTICE_HOURS_PROGRESSION.indexOf(nextHoursMilestone) - 1
  const prevHoursMilestone = PRACTICE_HOURS_PROGRESSION[previousMilestoneIndex]
  const currentProgress = totalHours - prevHoursMilestone
  const requiredProgress = nextHoursMilestone - prevHoursMilestone

  return Math.floor((currentProgress / requiredProgress) * 100)
}
