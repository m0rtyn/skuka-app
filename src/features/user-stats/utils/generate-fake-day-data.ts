import { DayData, Millisecond, FirestoreRefPath, Minute } from "shared/types"

export function generateFakeDayData(): DayData[] {
  const tmstmp = 1749938400000 as Millisecond
  const dayMs = (24 * 60 * 60 * 1000) as Millisecond
  const day = {
    statsRef: "stats/wsCtl2CR3H8TDcI8Vzyx" as FirestoreRefPath,
    count: 1,
    sessions: [],
    timestamp: tmstmp,
    totalDuration: 1.05 as Minute,
    userId: "MXhArt2BJKPHyr2CUVNpYbf1x8o1"
  }
  const dayData = new Array(60).fill(null).map((_, i) => ({
    ...day,
    timestamp: (tmstmp - i * dayMs) as Millisecond,
    count: i + 1,
    totalDuration: (i > 3 && i < 10 ? 0 : Math.random() * 59) as Minute,
    sessions: []
  }))
  return dayData
}
