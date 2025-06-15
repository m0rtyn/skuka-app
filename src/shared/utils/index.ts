import { DateString, Hour, Minute, SkukaSession, Second } from "shared/types"
import { roundToHundredth } from "./round-to-nth"
import { SECS_IN_MIN } from "shared/constants"

export { getFloorProgressionDiscrete as getFloorFibonacciDiscrete } from "./get-floor-fibonacci-discrete"
export { roundToHundredth, roundToTenth } from "./round-to-nth"
export { showAppVersion } from "./show-app-version"
export {
  serverDayDataToStoreAdapter,
  serverStatsDataToStoreAdapter
} from "./adapters"
export { getProgressionByType } from "./get-progression-by-type"

export const getClosestProgressionDiscrete = (
  seconds: Second,
  progression: Second[]
): Second => {
  const progressionDiscrete = progression.reduce(
    (prevDiscrete: Second, progressionNum: Second) => {
      const currDiff: Second = Math.abs(progressionNum - seconds) as Second
      const prevDiff: Second = Math.abs(prevDiscrete - seconds) as Second
      const isCloserToDiscrete = currDiff < prevDiff

      return isCloserToDiscrete ? progressionNum : prevDiscrete
    },
    Infinity as Second
  )

  return progressionDiscrete
}

export type TimeUnit = Hour | Minute | Second
export function getNextProgressionStage<T extends TimeUnit>(
  currentStage: T,
  timeProgress: T,
  progression: T[]
): T {
  const nextStageIndex = progression.indexOf(currentStage) + 1
  const nextStage =
    currentStage > timeProgress ? currentStage : progression[nextStageIndex]
  return nextStage
}

export function getFloorProgressionDiscrete<T extends TimeUnit>(
  timeUnits: T,
  progression: T[]
): T {
  const checkDiscrete = (acc: T, fibNum: T, index: number) => {
    const curDiff = Math.abs(fibNum - timeUnits) as T
    const prevDiff = Math.abs(acc - timeUnits) as T
    const isLessThanMinutes = timeUnits >= fibNum
    const isCloserToDiscrete = curDiff < prevDiff
    const closestFib = isCloserToDiscrete ? fibNum : acc

    return isLessThanMinutes ? closestFib : acc
  }

  const fibDiscrete = progression.reduce(checkDiscrete, 0 as T)

  return fibDiscrete
}

export const createSessionData = (
  userId: string,
  seconds: Second
): SkukaSession => {
  const timestamp = new Date().toISOString() as DateString
  const duration = roundToHundredth(seconds / SECS_IN_MIN) as Minute

  return {
    userId,
    timestamp,
    duration
  }
}
