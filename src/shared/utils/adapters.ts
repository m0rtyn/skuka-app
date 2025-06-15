import {
  DayData,
  FirestoreRefPath,
  Millisecond,
  ServerDayData,
  ServerUserStatsData,
  UserStatsData
} from "shared/types"

export const serverDayDataToStoreAdapter = (
  dayData: ServerDayData
): DayData => {
  return {
    ...dayData,
    timestamp: dayData.timestamp.toMillis() as Millisecond,
    statsRef: dayData.statsRef?.path as FirestoreRefPath
  }
}

export const serverStatsDataToStoreAdapter = (
  statsData: ServerUserStatsData
): UserStatsData => {
  return {
    ...statsData,
    // TODO: remove from server all nullable firstSessionDate values
    firstSessionDate: statsData.firstSessionDate?.toMillis() as Millisecond,
    averageDuration: statsData.averageDuration ?? null,
    averageCount: null,
    streak: null
  }
}
