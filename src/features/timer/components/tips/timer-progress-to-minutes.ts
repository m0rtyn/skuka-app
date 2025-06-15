import {
  TimeUnit,
  getFloorProgressionDiscrete,
  getNextProgressionStage
} from "shared/utils"

export const getTimerProgressToMinutes = <T extends TimeUnit>(
  timeUnits: T,
  progression: T[]
) => {
  const closestProgressionDiscrete = getFloorProgressionDiscrete(
    timeUnits,
    progression
  )

  const nextStage = getNextProgressionStage(
    closestProgressionDiscrete,
    timeUnits,
    progression
  )

  const currentStage =
    timeUnits < closestProgressionDiscrete ? nextStage : (
      closestProgressionDiscrete
    )

  return currentStage
}
