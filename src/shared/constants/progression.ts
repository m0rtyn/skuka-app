import { Second } from "shared/types"
import { SECS_IN_MIN } from "./time"

export const FIB_NUMS = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144] // durations of each stage in minutes
// export const OLD_STAGES = [0, 1, 3, 6, 11, 19, 32, 53, 87, 142, 231] // total durations of the stages in minutes with fibonacci diffs

/** total durations of the stages in seconds with custom diffs **/
export const EXPONENTIAL_STAGES = [
  // calculations: https://docs.google.com/spreadsheets/d/1y8HIfVffbQ-pcpXgFMf1036OAGCCFcUAyVgHxqSjo4g/edit?usp=sharing
  0,
  1, 3, 5, 8, 13, 20, 30, 50, 80, 130
].map(num => (num * SECS_IN_MIN) as Second)

export const LINEAR_STAGE_RATIOS = new Array(100)
  .fill(null)
  .map((_, i) => (i * SECS_IN_MIN) as Second)

export const FIBONACCI_STAGES = FIB_NUMS.map(
  num => (num * SECS_IN_MIN) as Second
)

/* NOTE: deprecated:
  export const fibonacciPercents = [1, 2, 3, 6, 9, 15, 24, 38, 62, 100]
  export const fibonacciMinsToSeconds = [60, 120, 180, 300, 480, 780, 1260]
*/

export const FIB_STYLE_SHEET_COLORS_NAMES = [
  "--c-red",
  // "--c-orange",
  "--c-yellow",
  "--c-green",
  "--c-cyan",
  "--c-blue",
  "--c-purple",
  "--c-magenta",
  "--c-ultrared",
  "--c-foreground"
]
export const FIB_NUM_TO_COLOR_VAR_MAP = {
  [EXPONENTIAL_STAGES[0]]: FIB_STYLE_SHEET_COLORS_NAMES[0],
  [EXPONENTIAL_STAGES[1]]: FIB_STYLE_SHEET_COLORS_NAMES[1],
  [EXPONENTIAL_STAGES[2]]: FIB_STYLE_SHEET_COLORS_NAMES[2],
  [EXPONENTIAL_STAGES[3]]: FIB_STYLE_SHEET_COLORS_NAMES[3],
  [EXPONENTIAL_STAGES[4]]: FIB_STYLE_SHEET_COLORS_NAMES[4],
  [EXPONENTIAL_STAGES[5]]: FIB_STYLE_SHEET_COLORS_NAMES[5],
  [EXPONENTIAL_STAGES[6]]: FIB_STYLE_SHEET_COLORS_NAMES[6],
  [EXPONENTIAL_STAGES[7]]: FIB_STYLE_SHEET_COLORS_NAMES[7],
  [EXPONENTIAL_STAGES[8]]: FIB_STYLE_SHEET_COLORS_NAMES[8]
}
