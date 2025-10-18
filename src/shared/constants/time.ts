import { Millisecond, Minute, Second } from "shared/types"

export const MILLIS_IN_SECOND: Millisecond = 1000 as Millisecond
export const SECS_IN_MIN: Second = 60 as Second
export const MINS_IN_HOUR: Minute = 60 as Minute
export const SECS_IN_HOUR: Second = (SECS_IN_MIN * MINS_IN_HOUR) as Second
export const SECS_IN_DAY: Second = SECS_IN_HOUR * 24 as Second
export const MILLIS_IN_DAY: Millisecond = SECS_IN_DAY * MILLIS_IN_SECOND as Millisecond
export const MILLIS_IN_QUARTER: Millisecond = MILLIS_IN_DAY * 91 as Millisecond
export const DAYS_IN_MONTH: number = 30

export const INITIAL_SESSION_DURATION: Second = 0 as Second
/** NOTE: equal to 21 minutes */
export const MAX_TIMER_SECONDS: Second = SECS_IN_MIN * 21 as Second