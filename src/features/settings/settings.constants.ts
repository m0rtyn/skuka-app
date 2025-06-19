import { DateRange, ProgressionType, Settings } from "./settings.types"

export const FEATURE_NAME = "settings"
export const defaultSettings = {
  darkMode: true,
  timerBlinking: true,
  progression: ProgressionType.ByAverage,
  sound: true,
  progressionRatio: 5
}
export const initialState = defaultSettings

export const DEFAULT_SETTINGS: Settings = {
  darkMode: true,
  timerBlinking: true,
  sound: true,
  defaultDateRange: DateRange.Year
}
