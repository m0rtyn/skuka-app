import { Second } from "shared/types"

// eslint-disable-next-line max-statements
export default function getRemainTime(
  closestDiscreteStage: Second,
  secondsProgress: Second,
  progression: Second[]
) {
  const nextStageIndex = progression.indexOf(closestDiscreteStage) + 1
  const nextStage = progression[nextStageIndex]
  const closestStage =
    secondsProgress < closestDiscreteStage ? closestDiscreteStage : nextStage
  const secondsToNextStage: Second = (closestStage - secondsProgress) as Second

  const minutesRemain = Math.floor(secondsToNextStage / 60)
  const secondsRemain = secondsToNextStage - minutesRemain * 60
  return { seconds: secondsRemain, minutes: minutesRemain }
}
