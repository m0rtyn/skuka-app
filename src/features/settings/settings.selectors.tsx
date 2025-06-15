import { RootState } from "app/store"

export const selectDefaultDateRange = (state: RootState) =>
  state.settings.defaultDateRange
