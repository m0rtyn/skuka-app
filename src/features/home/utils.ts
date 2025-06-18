import { SwipeEventData } from "react-swipeable"
import { FIB_NUM_TO_COLOR_VAR_MAP, SECS_IN_MIN } from "shared/constants"

type ColorHex = string

export const getColorStyleSheetVarName = (fibNum: number): ColorHex => {
  return FIB_NUM_TO_COLOR_VAR_MAP[fibNum]
}

export const getColorFromCSSVar = (colorCSSVarName: string): ColorHex => {
  const computedStyle = getComputedStyle(
    document?.documentElement
  )?.getPropertyValue(colorCSSVarName)
  return computedStyle
}

export function skipSwipeOnCalendar(e: SwipeEventData, cb: () => void) {
  if (e.absX < e.absY && e.absX < 50 && e.absY > 50) return

  const target = e.event.target as HTMLElement
  const currentTarget = e.event.currentTarget as HTMLElement

  const restrictedTags = ["svg", "rect"]
  const isHeatCalendar =
    restrictedTags.includes(target?.tagName) ||
    restrictedTags.includes(currentTarget?.tagName)

  if (isHeatCalendar) return
  cb()
}
