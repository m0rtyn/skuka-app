import { RootState } from "app/store"

export const selectLeaderboardUsers = (state: RootState) =>
  state.leaderboard.users
export const selectLeaderboardStatus = (state: RootState) =>
  state.leaderboard.status
export const selectLeaderboardError = (state: RootState) =>
  state.leaderboard.error
