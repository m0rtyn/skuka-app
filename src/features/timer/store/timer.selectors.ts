import { RootState } from "app/store"

export const selectRequestStatus = (state: RootState) =>
  state.mainScreen.requestStatus
