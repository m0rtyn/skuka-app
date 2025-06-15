import { Maybe } from "shared/types"

export interface LeaderboardUser {
  userId: string
  count: number
  totalDuration: number // in minutes
  displayName: string
  lastSessionDate: Maybe<string>
}

export interface LeaderboardState {
  users: LeaderboardUser[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null | undefined
}
