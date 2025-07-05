import { MILLIS_IN_DAY } from "shared/constants"
import { DayData } from "shared/types"
import { isSameDay, differenceInCalendarDays } from "date-fns"

const checkIsDayEmpty = (d: DayData) =>
  d.sessions.length === 0 && d.totalDuration === 0

export const countMaxStreak = (daysWithSession: DayData[]) => {
  console.trace(daysWithSession)
  if (daysWithSession.length === 0) return 0

  if (daysWithSession.some(d => checkIsDayEmpty(d)))
    throw new Error("Days with no sessions are not allowed")

  let maxStreak = 0
  let currentStreak = 0

  for (let i = 0; i < daysWithSession.length; i++) {
    if (i === 0) {
      currentStreak = 1
    } else {
      const day = daysWithSession[i].timestamp
      const prevDay = daysWithSession[i - 1].timestamp

      if (isSameDay(day, prevDay)) {
        continue // Same day, streak doesn't change
      }

      if (differenceInCalendarDays(day, prevDay) === 1) {
        currentStreak++
      } else {
        // Streak is broken
        maxStreak = Math.max(maxStreak, currentStreak)
        currentStreak = 1
      }
    }
  }

  return Math.max(maxStreak, currentStreak)
}

export const countStreak = (daysWithSession: DayData[]) => {
  if (daysWithSession.length === 0) return 0

  if (daysWithSession.some(d => checkIsDayEmpty(d)))
    throw new Error("Days with no sessions are not allowed")

  let currentStreak = 1
  const lastIdx = daysWithSession.length - 1

  for (let i = lastIdx; i > 0; i--) {
    const day = daysWithSession[i].timestamp
    const prevDay = daysWithSession[i - 1].timestamp

    if (isSameDay(day, prevDay)) {
      continue
    }

    if (differenceInCalendarDays(day, prevDay) === 1) {
      currentStreak++
    } else {
      // Streak is broken
      break
    }
  }

  return currentStreak
}

export function getStreakLevel(streak: number | null) {
  if (!streak) return null
  return (
    streak > 90 ? "🔥🔥🔥"
    : streak > 30 ? "🔥🔥"
    : streak > 10 ? "🔥"
    : null
  )
}
