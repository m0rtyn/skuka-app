import { SECS_IN_MIN } from "shared/constants"
import { Second, Minute } from "shared/types"
import {
  getClosestProgressionDiscrete,
  getNextProgressionStage
} from "shared/utils"

export function convertTimerProgressToCountdown(
  seconds: Second,
  todayPracticeMinutes: Minute[],
  progressionSecs: Second[]
): {
  secondsRemain: Second
  minutes: Minute
} {
  const todayPractice = (todayPracticeMinutes.reduce((acc, el) => acc + el, 0) *
    SECS_IN_MIN) as Second

  // useTimerSound(seconds + todayPractice)

  const currentSeconds = (seconds + todayPractice) as Second

  const closestDiscreteStage = getClosestProgressionDiscrete(
    currentSeconds,
    progressionSecs
  )

  const nextProgressionStage = getNextProgressionStage<Second>(
    closestDiscreteStage,
    currentSeconds,
    progressionSecs
  )

  const { seconds: secondsRemain, minutes } = getDayRemainTime(
    nextProgressionStage,
    seconds,
    todayPracticeMinutes
  )

  return {
    secondsRemain,
    minutes
  }
}

export function getDayRemainTime(
  nextStage: Second,
  seconds: Second,
  todayPractice: Minute[]
) {
  const todayPracticeAmount = todayPractice.reduce((acc, el) => acc + el, 0)
  const remainingSeconds = (nextStage -
    seconds -
    todayPracticeAmount * SECS_IN_MIN) as Second

  const minutes = Math.floor(remainingSeconds / SECS_IN_MIN) as Minute
  const secondsRemainder = Math.floor(remainingSeconds % SECS_IN_MIN) as Second

  return {
    minutes,
    seconds: secondsRemainder
  }
}
