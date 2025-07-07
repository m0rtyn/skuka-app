import { useState, useCallback } from "react"
import { User } from "@firebase/auth"
import { useAppDispatch, useAppSelector } from "app/store"
import useNoSleep from "shared/hooks/use-no-sleep"
import { mainScreenActions } from "../home/store/main-screen.slice"
import { setSessionThunk } from "../home/store/main-screen.thunks"
import { TimerButton } from "./components/timer-button/timer-button.component"
import { Countdown } from "./components/countdown/countdown.component"
// import { useTimerSound } from "./hooks/use-timer-sound"
import { Tips } from "./components/tips"
import { BottomTextWrapper, Wrapper } from "./timer.styles"
import { Second } from "shared/types"
import { selectIsTimerStarted } from "../home/store/main-screen.selectors"
import { MILLIS_IN_SECOND } from "shared/constants"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "app/firebase-init"

// TODO: refactor component
// eslint-disable-next-line max-statements
const Timer: React.FC = () => {
  const [timerDiff, setTimerDiff] = useState<Second>(0 as Second)
  const [currentTimerId, setCurrentTimerId] = useState<number | null>(null)
  const isTimerStarted = useAppSelector(selectIsTimerStarted)

  const dispatch = useAppDispatch()

  const [user, authLoading] = useAuthState(auth)
  useNoSleep(isTimerStarted)
  // useTimerSound(timerDiff)

  useCallback(() => {
    return () => {
      finishTimer(timerDiff)
    }
  }, [])

  const finishTimer = useCallback(
    // eslint-disable-next-line max-statements
    async (timerDiff: Second): Promise<void> => {
      const isCurrentTimerIdExist = currentTimerId !== null
      if (!isCurrentTimerIdExist) throw Error("currentTimerId is not exist")

      window.clearInterval(currentTimerId)

      dispatch(mainScreenActions.setTimerStatus(false))
      setTimerDiff(0 as Second)

      const isSessionLongerThanMin = timerDiff > MIN_SESSION_DURATION
      if (!isSessionLongerThanMin) return

      try {
        // NOTE: line below for fast debugging
        // dispatch(setSessionThunk({ user, seconds: 61 }))
        dispatch(setSessionThunk({ user, seconds: timerDiff }))
      } catch (e) {
        console.error(e)
      }
    },
    [currentTimerId, dispatch, user]
  )

  const handleTimer = useCallback((startTime: Second) => {
    const secondsNow = Math.round(Date.now() / MILLIS_IN_SECOND) as Second
    const secondsDiff = (secondsNow - startTime) as Second
    setTimerDiff(secondsDiff)
  }, [])

  const startTimer = useCallback(() => {
    const startInSeconds = Math.round(Date.now() / MILLIS_IN_SECOND) as Second
    dispatch(mainScreenActions.setTimerStatus(true))

    const newTimerId = window.setInterval(
      () => handleTimer(startInSeconds),
      100
    )
    setCurrentTimerId(newTimerId)
  }, [dispatch, handleTimer])

  const handleClick = useCallback(() => {
    setTimerDiff(0 as Second)

    if (isTimerStarted) {
      return finishTimer(timerDiff)
    } else {
      return startTimer()
    }
  }, [finishTimer, isTimerStarted, startTimer, timerDiff])

  return (
    <Wrapper>
      <TimerButton
        handleTimerClick={handleClick}
        isTimerStarted={isTimerStarted}
        authLoading={authLoading}
      >
        {!authLoading && <Countdown seconds={timerDiff} />}
      </TimerButton>

      <BottomTextWrapper>
        {!authLoading && (
          <Tips
            second={timerDiff}
            isTimerStarted={isTimerStarted}
          />
        )}
      </BottomTextWrapper>
    </Wrapper>
  )
}

const MIN_SESSION_DURATION = 10 as Second

export default Timer
