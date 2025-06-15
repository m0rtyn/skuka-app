import { Second } from 'shared/types'

export const getFloorProgressionDiscrete = (
  seconds: Second,
  progression: Second[]
) => {
  const progDiscrete = progression.reduce(
    (acc, progressionNum) => getClosestDiscrete(acc, progressionNum, seconds),
    0 as Second
  )

  return progDiscrete
}

const getClosestDiscrete = (acc: Second, progNum: Second, seconds: Second) => {
  const curDiff = Math.abs(progNum - seconds)
  const prevDiff = Math.abs(acc - seconds)
  const isLessThanMinutes = seconds >= progNum

  const isCloserToDiscrete = curDiff < prevDiff
  const closestDiscrete = isCloserToDiscrete ? progNum : acc

  return isLessThanMinutes ? closestDiscrete : acc
}
