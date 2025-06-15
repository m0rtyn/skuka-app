import { RequestStatus } from "shared/types"

export const BLACK = "#000"

export const DARK_GRAY = "#272823"
export const GRAY = "#656565"
export const LIGHT_GRAY = "#CCC"

export const RED = "#fea490"
export const ORANGE = "#ffc26c"
export const YELLOW = "#ccf994"
export const GREEN = "#5ff4ad"
export const CYAN = "#3ff0ed"
export const BLUE = "#7cb1ff"
export const MAGENTA = "#ff66f0"
export const ALMOST_WHITE = "#f5f5f5"

export enum CSS_COLOR_VARIABLES {
  BACKGROUND = "--c-background",
  DARKEN_GRAY = "--c-backgrounden-gray",
  DARK_GRAY = "--c-background",
  GRAY = "--c-gray",
  RED = "--c-red",
  ORANGE = "--c-orange",
  YELLOW = "--c-yellow",
  GREEN = "--c-green",
  CYAN = "--c-cyan",
  BLUE = "--c-blue",
  MAGENTA = "--c-magenta",
  FOREGROUND = "--c-foreground"
}

export const REQUEST_STATUS_TO_COLOR_MAP = new Map<RequestStatus, string>([
  [RequestStatus.NONE, "var(--c-gray)"],
  [RequestStatus.REQUEST, "var(--c-yellow)"],
  [RequestStatus.SUCCESS, "var(--c-green)"],
  [RequestStatus.FAILURE, "var(--c-red)"]
])
