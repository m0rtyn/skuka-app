export function roundToTenth<T extends number>(num: T): T {
  return (Math.round(num * 10) / 10) as T
}

export function roundToHundredth<T extends number>(num: T): T {
  return (Math.round(num * 100) / 100) as T
}
