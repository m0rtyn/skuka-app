import { startOfDay, startOfToday } from "date-fns"
import { MILLIS_IN_DAY } from "shared/constants"
import { DayData, Millisecond } from "shared/types"

// NOTE: return array of every session for every day from first session date
// TODO: refactor function
// TODO: add tests
// eslint-disable-next-line max-statements
export const getFullRange = (daysWithSessions: DayData[]) => {
  if (daysWithSessions.length === 0) return []

  const dayDataWithMissedDays = daysWithSessions.reverse()
  // .reduce(addMissedDays, [] as DayData[]) // TEMP: commented out due to removing the TV-chart by heat-calendar

  const todayTimestamp = startOfToday().getTime() as Millisecond
  const lastDayInRange = dayDataWithMissedDays.at(-1) as DayData

  const lastDayEqualToToday = lastDayInRange.timestamp === todayTimestamp
  if (lastDayEqualToToday) return dayDataWithMissedDays

  const dateDiff = getDateDiffInDays(todayTimestamp, lastDayInRange.timestamp)
  if (dateDiff <= 0) return dayDataWithMissedDays

  const lastMissedDays = createMissedDays(
    dateDiff,
    todayTimestamp,
    lastDayInRange
  )

  const fullRange = dayDataWithMissedDays.concat(lastMissedDays)
  return fullRange
}
// TEMP: commented out due to removing the TV-chart by heat-calendar
// eslint-disable-next-line max-statements
function addMissedDays(
  acc: DayData[],
  day: DayData,
  i: number,
  arr: DayData[]
): DayData[] {
  if (i === 0) return [...acc, day]

  const prevSessionDate = arr[i - 1].timestamp
  const expectedDate = (prevSessionDate + MILLIS_IN_DAY) as Millisecond

  const isCurrentDateEqualToExpected = day.timestamp === expectedDate
  const accWithMissedDays = countAndPushMissedDays(acc, day, expectedDate)

  return !isCurrentDateEqualToExpected ? accWithMissedDays : [...acc, day]
}

function getNextDayTimestamp(date: Millisecond) {
  return (date + MILLIS_IN_DAY) as Millisecond
}

function countAndPushMissedDays(
  acc: DayData[],
  day: DayData,
  expectedDate: Millisecond
) {
  const dateDiffInDays = getDateDiffInDays(day.timestamp, expectedDate)
  if (dateDiffInDays <= 0) return acc

  const missedDays = createMissedDays(dateDiffInDays, expectedDate, day)

  const newAcc = acc.concat(missedDays, day)

  return newAcc
}

function createMissedDays(
  dateDiffInDays: number,
  expectedDate: Millisecond,
  day: DayData
) {
  if (dateDiffInDays <= 0) return []

  return Array(dateDiffInDays)
    .fill(null)
    .map((_, i) => {
      const newTimestamp =
        i > 0 ? getNextDayTimestamp(expectedDate) : expectedDate
      const emptyDay: DayData = {
        userId: day.userId,
        statsRef: day.statsRef,
        timestamp: newTimestamp,
        sessions: [],
        totalDuration: 0,
        count: 0
      }
      return emptyDay
    })
}

function getDateDiffInDays(
  dayTimestamp: Millisecond,
  expectedDate: Millisecond
) {
  const diffInDays = Math.ceil((dayTimestamp - expectedDate) / MILLIS_IN_DAY)

  // if (diffInDays < 0) {
  //   const errorMsg = `
  //     Negative difference between dates:
  //     current: ${new Date(dayTimestamp).toString()}
  //     expected: ${new Date(expectedDate).toString()}
  //     diffDays: ${diffInDays}
  //   `
  //   throw new Error(errorMsg)
  // }

  return diffInDays
}
