import { RootState } from "app/store"

export const selectLeaderboardUsers = (state: RootState) =>
  state.leaderboard.leaderboard
export const selectLeaderboardStatus = (state: RootState) =>
  state.leaderboard.status
export const selectLeaderboardError = (state: RootState) =>
  state.leaderboard.error
