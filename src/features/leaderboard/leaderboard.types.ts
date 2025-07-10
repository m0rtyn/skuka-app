import { Maybe } from "shared/types"

export interface LeaderboardData {
  userId: string
  count: number
  totalDuration: number // in minutes
  displayName: Maybe<string>
  lastSessionTime: Maybe<number>
  maxStreak: Maybe<number>
}

export interface LeaderboardState {
  leaderboard: LeaderboardData[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null | undefined
}
