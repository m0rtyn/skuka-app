import { useAppSelector } from "app/store"
import { StyledCountdown } from "./countdown.styles"
import { CYAN, GREEN, RED, YELLOW } from "shared/constants"
import { useCountdown } from "features/timer/hooks/use-countdown"
import { useTimerSound } from "features/timer/hooks/use-timer-sound"
import useSound from "use-sound"
import { useEffect } from "react"
import bellSfx from "shared/assets/sounds/session-bell-sound.mp3"
import styles from "./countdown.module.css"
import classnames from "classnames"
import { Second } from "shared/types"
import { selectRequestStatus } from "features/timer/store/timer.selectors"

export const Countdown: React.FC<Props> = ({
  seconds,
  checkmarkAnimation = true
}) => {
  const status = useAppSelector(selectRequestStatus)

  const { isBlinking, timeRemain } = useCountdown(seconds)
  // useTimerSound(remain)

  // const [playSound] = useSound(bellSfx, {
  //   volume: 0.2
  // })
  // const sound = useAppSelector(state => state.settings.sound)

  // useEffect(() => {
  //   if (remain !== 0) return

  //   if (!sound) return
  //   return playSound()
  // }, [remain, playSound, sound])

  // const countDownColor =
  //   status === 'loaded' ? CYAN
  //   : status === 'error' ? RED
  //   : status === 'loading' ? YELLOW
  //   : 'var(--c-foreground)'

  return (
    <div
      className={classnames(styles.countdown, {
        [styles.countdownAnimation]: isBlinking,
        [styles.loading]: status === "loading",
        [styles.error]: status === "error",
        [styles.loaded]: status === "loaded"
      })}
    >
      {timeRemain}
    </div>
  )
}

interface Props {
  seconds: Second
  checkmarkAnimation?: boolean
}
