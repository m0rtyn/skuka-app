import { Line as LineProgress } from "rc-progress"
import { add, format } from "date-fns"
import { MILLIS_IN_DAY, MINS_IN_HOUR } from "shared/constants"
import {
  getFloorProgressionDiscrete,
  getNextProgressionStage
} from "shared/utils"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { PRACTICE_HOURS_PROGRESSION } from "../../user-stats.constants"
import { ProgressWrapper, Wrapper } from "./foresight.styles"
import { useMemo } from "react"
import { getMilestoneProgress } from "features/user-stats/utils/user-stats.utils"
import { Hour, Minute } from "shared/types"
import {
  StyledStat,
  StyledStatNumber
} from "../stats-numbers/stats-numbers.styles"

interface Props {
  totalHours: Hour
  average: Minute
}
export const Foresight: React.FC<Props> = ({ totalHours, average }) => {
  const currentHoursMilestone = useMemo(
    () => getFloorProgressionDiscrete(totalHours, PRACTICE_HOURS_PROGRESSION),
    [totalHours]
  )

  const nextHoursMilestone = useMemo(
    () =>
      getNextProgressionStage(
        currentHoursMilestone,
        totalHours,
        PRACTICE_HOURS_PROGRESSION
      ),
    [currentHoursMilestone, totalHours]
  )

  const milestoneProgress = useMemo(
    () => getMilestoneProgress(nextHoursMilestone, totalHours),
    [nextHoursMilestone, totalHours]
  )

  const averageHoursPerDay = (average / MINS_IN_HOUR) as Hour

  const daysToNextMilestone =
    (nextHoursMilestone - totalHours) / averageHoursPerDay
  const nextMilestoneDate = new Date(
    Date.now() + MILLIS_IN_DAY * daysToNextMilestone
  )
  const daysUntilNextMilestone = Math.floor(
    (nextMilestoneDate.valueOf() - Date.now()) / MILLIS_IN_DAY
  )
  const dateOfNextMilestone = format(
    add(new Date(), { days: daysUntilNextMilestone }),
    "'at' dd MMM ‘yy"
  )

  const progressTrialColor = "var(--c-background)"
  const progressStrokeColor = "var(--c-gray)"

  return (
    <Wrapper>
      {nextHoursMilestone && nextMilestoneDate ?
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
