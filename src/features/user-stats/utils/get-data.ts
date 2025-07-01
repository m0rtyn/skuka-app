import { DayData, MockDayData, UserStatsData } from "shared/types"
import { calcAverageSessionPerDay, getPseudoDayData } from "./user-stats.utils"

// TODO: refactor this method
// eslint-disable-next-line max-statements
export function getForesightDaysData(
  daysData: DayData[],
  stats: UserStatsData,
  additionalDataLength: number
) {
  const lastData = daysData[daysData.length - 1]

  if (stats.firstSessionDate === null) return null

  const averageSessionDuration =
    stats.averageDuration ??
    calcAverageSessionPerDay(stats.firstSessionDate, stats.totalDuration)

  const additionalDaysData: MockDayData[] = new Array(additionalDataLength)
    .fill(null)
    .map((_, i) =>
      getPseudoDayData(i, lastData?.timestamp, averageSessionDuration)
    )

  return additionalDaysData
}
