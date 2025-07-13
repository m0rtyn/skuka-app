import { Line as LineProgress } from "rc-progress"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { ProgressWrapper, Wrapper } from "./foresight.styles"
import { Hour, Maybe, Minute } from "shared/types"
import {
  StyledStat,
  StyledStatNumber
} from "../stats-numbers/stats-numbers.styles"
import { useForesight } from "./use-foresight"

interface Props {
  totalHours: Maybe<Hour>
  average: Maybe<Minute>
}
export const Foresight: React.FC<Props> = ({ totalHours, average }) => {
  const {
    currentHoursMilestone,
    nextHoursMilestone,
    milestoneProgress,
    daysUntilNextMilestone,
    nextMilestoneDate,
    dateOfNextMilestone,
    isForesightExist
  } = useForesight(totalHours, average)

  const progressTrialColor = "var(--c-background)"
  const progressStrokeColor = "var(--c-gray)"

  return (
    <Wrapper data-empty-state>
      {dateOfNextMilestone && milestoneProgress ?
        <>
          <StyledStat>
            <StyledTooltip
              content={dateOfNextMilestone}
              $positionSide='right'
            >
              <StyledStatNumber>{daysUntilNextMilestone}*</StyledStatNumber>
            </StyledTooltip>

            <span>days of practice left </span>
            <div>
              to {nextHoursMilestone} hour
              {nextHoursMilestone === 1 ? "" : "s"} of session
            </div>
          </StyledStat>

          <ProgressWrapper>
            <LineProgress
              className='progress-bar'
              percent={milestoneProgress}
              trailColor={progressTrialColor}
              strokeColor={progressStrokeColor}
            />
          </ProgressWrapper>
        </>
      : null}
    </Wrapper>
  )
}
