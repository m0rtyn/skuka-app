import { useAppSelector } from "app/store"
import { startOfToday } from "date-fns"
import { useCallback, useMemo } from "react"
import { useEffect, useState } from "react"
import { SECS_IN_MIN } from "shared/constants"
import { Second, Minute } from "shared/types"
import {
  getProgressionByType,
  getClosestProgressionDiscrete,
  getNextProgressionStage
} from "shared/utils"
import { remainTimeToDigitClock } from "../components/countdown/remainTimeToDigitClock"
import { selectAverageDuration } from "features/user-stats/store/user-stats.selectors"

// eslint-disable-next-line max-statements
export const useCountdown = (seconds: Second) => {
  const [timeRemain, setTimeRemain] = useState("00:00")
  const [secondsRemain, setSecondsRemain] = useState<Second>(0 as Second)
  const [minutesRemain, setMinutesRemain] = useState<Minute>(0 as Minute)
  const [isBlinkingStarted, setIsAnimationEnabled] = useState(false)

  const averageDuration = useAppSelector(selectAverageDuration)

  const isTimerBlinking = useAppSelector(state => state.settings.timerBlinking)
  const progressionType = useAppSelector(state => state.settings.progression)
  const daysData = useAppSelector(state => state.userStats.daysData)

  const todayPracticeMinutes = useMemo(() => {
    const todayTimestamp = startOfToday().getTime()
    return daysData
      .filter(entry => entry.timestamp >= todayTimestamp)
      .map(entry =>
        entry.sessions.reduce(
          (acc, el) => (acc + el.duration) as Minute,
          0 as Minute
        )
      )
  }, [daysData])

  const progressionSecs = useMemo(() => {
    return getProgressionByType(progressionType, {
      average: averageDuration ?? (1 as Minute)
    })
  }, [averageDuration, progressionType])

  // WARN:
  // useTimerSound(seconds)

  const convertTimerProgressToCountdown = useCallback(
    // eslint-disable-next-line max-statements
    (seconds: Second) => {
      const todayPractice = (todayPracticeMinutes.reduce(
        (acc, el) => acc + el,
        0
      ) * SECS_IN_MIN) as Second

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
    },
    [progressionSecs, todayPracticeMinutes]
  )

  useEffect(() => {
    if (!seconds) return
    const { minutes, secondsRemain } = convertTimerProgressToCountdown(seconds)
    setSecondsRemain(secondsRemain)
    setMinutesRemain(minutes as Minute)

    return () => {
      setSecondsRemain(0 as Second)
      setMinutesRemain(0 as Minute)
    }
  }, [seconds])

  useEffect(() => {
    if (seconds === 0) {
      setSecondsRemain(0 as Second)
      setMinutesRemain(0 as Minute)
    }

    const timeRemain = remainTimeToDigitClock(secondsRemain, minutesRemain)
    setTimeRemain(timeRemain)
  }, [minutesRemain, seconds, secondsRemain])

  useEffect(() => {
    if (seconds === 0) return
    setIsAnimationEnabled(true)
    return () => setIsAnimationEnabled(false)
  }, [seconds])

  const isBlinking = isTimerBlinking && isBlinkingStarted

  return { timeRemain, isBlinking }
}

const getDayRemainTime = (
  nextStage: Second,
  seconds: Second,
  todayPractice: Minute[]
) => {
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
