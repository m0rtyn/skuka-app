import { useCallback, useMemo, useState } from 'react'
import useSound from 'use-sound'
import styles from './timer-button.module.css'
import clickSfx from 'shared/assets/sounds/finger-snap.mp3'
import { LongPressEventType, useLongPress } from 'use-long-press'

type Props = {
  handleTimerClick: () => void
  children: React.ReactNode
  isTimerStarted?: boolean
  authLoading?: boolean
}

export const TimerButton: React.FC<Props> = ({
  handleTimerClick,
  children,
  isTimerStarted = false,
  authLoading = false
}) => {
  const [playClick] = useSound(clickSfx)
  const [isTimerPressed, setIsTimerPressed] = useState(false)

  const clickWithSound = useCallback(() => {
    playClick()
    handleTimerClick()
  }, [handleTimerClick, playClick])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Space' || e.key === 'Enter') {
        clickWithSound()
      }
    },
    [clickWithSound]
  )

  const bindLongPress = useLongPress(
    () => {
      clickWithSound()
    },
    {
      threshold: 500,
      captureEvent: true,
      cancelOnMovement: false,
      detect: LongPressEventType.Pointer,
      onStart: () => setIsTimerPressed(true),
      onFinish: () => setIsTimerPressed(false),
      onCancel: () => setIsTimerPressed(false)
    }
  )

  const classNames = `${styles.timerButton} ${
    isTimerStarted ? styles.timerStarted : null
  } ${authLoading ? styles.authLoading : null}`

  const pressProgressClassNames = useMemo(() => {
    return `${styles.pressProgress} ${
      isTimerPressed ? styles.timerButtonPressed : null
    }`
  }, [isTimerPressed])

  return (
    <button
      {...bindLongPress()}
      onKeyDown={handleKeyDown}
      className={classNames}
      type='button'
      autoFocus
    >
      <div className={pressProgressClassNames} />
      {children}
    </button>
  )
}
