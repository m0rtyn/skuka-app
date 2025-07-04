import { Timestamp } from "firebase/firestore"
import {
  Millisecond,
  Minute,
  PseudoDayData,
  ServerUserStatsData,
  UserStatsData
} from "shared/types"

export const INIT_SERVER_STATS: ServerUserStatsData = {
  firstSessionDate: Timestamp.fromDate(new Date()),
  totalDuration: 0 as Minute,
  count: 0,
  maxStreak: 0,
  userId: null,
  averageDuration: null,
  updatedAt: null
}

export const INIT_STATS: UserStatsData = {
  firstSessionDate: new Date().getTime() as Millisecond,
  totalDuration: 0 as Minute,
  count: 0,
  streak: 0,
  maxStreak: 0,
  userId: null,
  averageDuration: null,
  averageCount: null,
  updatedAt: null
}

export const INIT_DAY_DATA: PseudoDayData = {
  timestamp: new Date().getTime() as Millisecond,
  count: 0,
  totalDuration: 0,
  sessions: [],
  userId: ""
}
