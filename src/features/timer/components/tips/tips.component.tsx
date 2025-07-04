import React, { useState } from "react"
import { getNextProgressionStage, getProgressionByType } from "shared/utils"
import {
  StageNumber,
  StageWrapper,
  StyledDesc,
  StyledPercent,
  StyledTip,
  StyledTriangle,
  StyledUnits,
  Wrapper
} from "./tips.styles"
import { SECS_IN_MIN } from "shared/constants"
import { Minute, Second } from "shared/types"
import { useAppSelector } from "app/store"
import { getTimerProgressToMinutes } from "./timer-progress-to-minutes"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { selectAverageDuration } from "features/user-stats/store/user-stats.selectors"

interface Props {
  second: Second
  isTimerStarted: boolean
}
// TODO: refactor component
export const Tips: React.FC<Props> = React.memo(
  // eslint-disable-next-line max-statements, complexity
  ({ second, isTimerStarted }) => {
    const [currentStage, setCurrentStage] = useState<Second>(0 as Second)
    const progressionType = useAppSelector(state => state.settings.progression)
    const average = useAppSelector(selectAverageDuration) ?? (1 as Minute)

    const progressionSecs = getProgressionByType(progressionType, {
      average
    })

    const nextStage = getNextProgressionStage<Second>(
      currentStage,
      second,
      progressionSecs
    )

    React.useEffect(() => {
      if (second) {
        const currentStage = getTimerProgressToMinutes(second, progressionSecs)
        setCurrentStage(currentStage as Second)
      }
    }, [progressionSecs, second])

    React.useEffect(() => {
      if (second === 0) {
        setCurrentStage(second)
      }
    }, [currentStage, second])

    const nextStageInMinutes: Minute = React.useMemo(
      () => (Math.floor((nextStage / SECS_IN_MIN) * 100) / 100) as Minute,
      [nextStage]
    )

    const timerUnits = React.useMemo(
      () => (nextStageInMinutes === 1 ? "minute" : "minutes"),
      [nextStageInMinutes]
    )

    const articleForm = React.useMemo(
      () => (nextStageInMinutes === 1 ? "is" : "are"),
      [nextStageInMinutes]
    )

    const percent = (average && second / SECS_IN_MIN / average) ?? 0
    const resultRatio = (percent && percent > 1 && percent.toFixed(1)) || null

    return (
      <Wrapper>
        {isTimerStarted ?
          <>
            <StyledTriangle />

            <StageWrapper>
              <StageNumber>{nextStageInMinutes}</StageNumber>
              <StyledUnits>{timerUnits}</StyledUnits>
              <StyledDesc>{articleForm}&nbsp;up&nbsp;next</StyledDesc>
            </StageWrapper>

            {resultRatio ?
              <StyledPercent>
                <StyledTooltip content='Current session multiplier'>
                  x{resultRatio}
                </StyledTooltip>
              </StyledPercent>
            : null}
          </>
        : <StyledTip>Hold the button to start</StyledTip>}
      </Wrapper>
    )
  }
)
