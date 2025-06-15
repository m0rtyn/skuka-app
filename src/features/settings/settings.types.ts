export enum DateRange {
  AllTime = "All Time",
  Quarter = "Quarter",
  Year = "Year"
}

export type YearString = "2020" | "2021" | "2022" | "2023" | "2024" | "2025"

export enum ProgressionType {
  Default = "default",
  Fibonacci = "fibonacci",
  Linear = "linear",
  ByAverage = "by average"
}

export interface Settings {
  darkMode: boolean
  timerBlinking: boolean
  sound: boolean
  defaultDateRange: DateRange
  /** @deprecated */
  defaultChartRange?: DateRange
  /** @deprecated */
  progression?: ProgressionType
  /** @deprecated */
  progressionRatio?: number
}

export interface SettingsState extends Settings {}
