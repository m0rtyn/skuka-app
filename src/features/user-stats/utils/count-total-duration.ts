import { DayData, Minute } from "shared/types"

export function calcTotalDuration(days: DayData[]): Minute {
  return days.reduce<Minute>(
    (acc, day) => (acc + calcDayDuration(day)) as Minute,
    0 as Minute
  )
}

export function calcDayDuration(day: DayData): Minute {
  return day.sessions.length > 0 ?
      day.sessions.reduce<Minute>(
        (a, m) => (a + m?.duration || 0) as Minute,
        0 as Minute
      )
    : (day.totalDuration as Minute)
}
