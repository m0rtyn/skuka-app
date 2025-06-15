import useSound from "use-sound"
import React from "react"
import bellSfx from "shared/assets/sounds/session-bell-sound.mp3"
import { SECS_IN_MIN } from "shared/constants"
import { useAppSelector } from "app/store"
import { Minute, Second } from "shared/types"
import { getProgressionByType } from "shared/utils"

export const useTimerSound = (progress: Second) => {
  const [playSound] = useSound(bellSfx, {
    volume: 0.2
  })
  const sound = useAppSelector(state => state.settings.sound)
  const progressionType = useAppSelector(state => state.settings.progression)
  const average =
    useAppSelector(state => state.userStats.stats?.averageDuration) ??
    (1 as Minute)

  const progression = getProgressionByType(progressionType, { average })

  // TODO: remake in custom hook instead of component
  React.useEffect(() => {
    if (progress === 0) return

    const isProgressionNum = progression.includes(
      (progress / SECS_IN_MIN) as Second
    )
    if (sound && isProgressionNum) {
      return playSound()
    }
  }, [progress, playSound, sound])
}
