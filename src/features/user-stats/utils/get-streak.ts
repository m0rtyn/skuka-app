import { MILLIS_IN_DAY } from "shared/constants"
import { DayData } from "shared/types"

const checkIsDayEmpty = (d: DayData) =>
  d.sessions.length === 0 && d.totalDuration === 0

export const countMaxStreak = (daysWithSession: DayData[]) => {
  if (daysWithSession.length === 0) return 0

  if (daysWithSession.some(d => checkIsDayEmpty(d)))
    throw new Error("Days with no sessions are not allowed")

  let maxStreak = 0
  let currentStreak = 0
  const lastIdx = daysWithSession.length - 1

  for (let i = 0; i <= lastIdx; i++) {
    const day = daysWithSession[i]
    const prevDay = i > 0 ? daysWithSession[i - 1] : null
    const dayDiff =
      prevDay && (day.timestamp - prevDay?.timestamp) / MILLIS_IN_DAY

    const isDayIdentical = dayDiff === 0
    const isDiffMoreThanOne = dayDiff !== null && dayDiff > 1

    if (isDayIdentical) continue
    if (isDiffMoreThanOne) {
      maxStreak = Math.max(maxStreak, currentStreak)
      currentStreak = 1
      continue
    }

    currentStreak += 1
    if (i === lastIdx) maxStreak = Math.max(maxStreak, currentStreak)
  }

  return maxStreak
}

export const countStreak = (daysWithSession: DayData[]) => {
  if (daysWithSession.length === 0) return 0
  if (daysWithSession.length === 1) return 1
  const lastIdx = daysWithSession.length - 1

  let streak = 0

  for (let i = lastIdx; i > 0; i--) {
    const day = daysWithSession[i]
    const nextDay = i > 0 ? daysWithSession[i + 1] : null

    const dayDiff =
      nextDay && (nextDay?.timestamp - day.timestamp) / MILLIS_IN_DAY
    const isDiffExist = dayDiff !== null

    const isDayIdentical = isDiffExist && Math.round(dayDiff) === 0
    const isDiffMoreThanOne = isDiffExist && dayDiff > 1

    if (isDayIdentical) continue
    if (isDiffMoreThanOne) break

    streak += 1
  }

  return streak
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
