import { useAppSelector } from "app/store"
import { startOfToday } from "date-fns"
import { useMemo } from "react"
import { useEffect, useState } from "react"
import { Second, Minute } from "shared/types"
import { getProgressionByType } from "shared/utils"
import { remainTimeToDigitClock } from "../components/countdown/remainTimeToDigitClock"
import { selectAverageDuration } from "features/user-stats/store/user-stats.selectors"
import { convertTimerProgressToCountdown } from "../utils"

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

  // WARN: return that feature
  // useTimerSound(seconds)

  useEffect(() => {
    if (!seconds) return
    const { minutes, secondsRemain } = convertTimerProgressToCountdown(
      seconds,
      todayPracticeMinutes,
      progressionSecs
    )

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
