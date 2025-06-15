import { Millisecond, Minute, Second } from "shared/types"

export const MILLIS_IN_SECOND: Millisecond = 1000
export const SECS_IN_MIN: Second = 60
export const MINS_IN_HOUR: Minute = 60
export const SECS_IN_HOUR: Second = SECS_IN_MIN * MINS_IN_HOUR
export const SECS_IN_DAY: Second = SECS_IN_HOUR * 24
export const MILLIS_IN_DAY: Millisecond = SECS_IN_DAY * MILLIS_IN_SECOND
export const MILLIS_IN_QUARTER: Millisecond = MILLIS_IN_DAY * 91
export const DAYS_IN_MONTH: number = 30

export const INITIAL_SESSION_DURATION: Second = 0
/** NOTE: equal to 21 minutes */
export const MAX_TIMER_SECONDS: Second = SECS_IN_MIN * 21
