import { TimeUnit } from "."

export function roundToTenth<T extends number>(average: T): T {
  return (Math.round(average * 10) / 10) as T
}

export function roundToHundredth<T extends number>(average: T): T {
  return (Math.round(average * 100) / 100) as T
}
