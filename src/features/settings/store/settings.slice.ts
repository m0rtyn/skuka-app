import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_SETTINGS, FEATURE_NAME } from "../settings.constants"
import { DateRange, SettingsState } from "../settings.types"

const initialState: SettingsState = DEFAULT_SETTINGS

export const settingsSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
    },
    toggleTimerBlinking: state => {
      state.timerBlinking = !state.timerBlinking
    },
    toggleSound: state => {
      state.sound = !state.sound
    },
    toggleDefaultDateRange: (state, action: PayloadAction<void>) => {
      const newDateRange =
        state.defaultDateRange === DateRange.AllTime ?
          DateRange.Year
        : DateRange.AllTime
      state.defaultDateRange = newDateRange
    },
    setDefaultDateRange: (
      state,
      action: PayloadAction<SettingsState["defaultDateRange"]>
    ) => {
      state.defaultDateRange = action.payload
    },
    // setProgression: (
    //   state,
    //   action: PayloadAction<SettingsState["progression"]>
    // ) => {
    //   state.progression = action.payload
    // },
    // setProgressionRatio: (
    //   state,
    //   action: PayloadAction<SettingsState["progressionRatio"]>
    // ) => {
    //   state.progressionRatio = action.payload
    // },
    setSettings: (state, { payload }: PayloadAction<SettingsState>) => {
      state.darkMode = payload.darkMode
      state.timerBlinking = payload.timerBlinking
      state.sound = payload.sound
      state.defaultDateRange = payload.defaultDateRange
    }
  }
})

export const settingsActions = {
  ...settingsSlice.actions
}

export const settingsSliceReducer = settingsSlice.reducer
