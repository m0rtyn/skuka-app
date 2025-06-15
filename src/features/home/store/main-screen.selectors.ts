import { RootState } from "app/store"

export const selectIsTimerStarted = (state: RootState) =>
  state.mainScreen.timerStatus === "started"
