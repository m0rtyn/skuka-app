import { Foresight } from "../../../user-stats/components/foresight/foresight.component"
import {
  StyledStat,
  StyledStatNumber,
  Wrapper
} from "../../../user-stats/components/stats-numbers/stats-numbers.styles"
import { getStreakLevel } from "features/user-stats/utils/get-streak"
import { Hour, UserStatsData } from "shared/types"
import { MINS_IN_HOUR } from "shared/constants"

interface Props {
  statsData?: UserStatsData
}
export const TutorStatsNumbers: React.FC<Props> = ({
  statsData: fakeStats
}) => {
  const activeDays = 99
  const maxStreak = fakeStats?.maxStreak
  const averageDuration = fakeStats?.averageDuration
  const averageCount = fakeStats?.averageCount
  const totalHours = ((fakeStats?.totalDuration ?? 100) / MINS_IN_HOUR) as Hour
  const streak = fakeStats?.streak ?? 10

  const streakLevel = getStreakLevel(streak)

  const isTotalHoursExist = totalHours !== null

  return (
    <Wrapper>
      {isTotalHoursExist && averageDuration && (
        <Foresight
          totalHours={totalHours}
          average={averageDuration}
        />
      )}

      <StyledStat>
        {isTotalHoursExist && (
          <>
            <StyledStatNumber>{totalHours}</StyledStatNumber>{" "}
            hours&nbsp;in&nbsp;total
          </>
        )}
      </StyledStat>

      <StyledStat>
        {activeDays && (
          <>
            <StyledStatNumber>{activeDays}</StyledStatNumber> active&nbsp;days
          </>
        )}
      </StyledStat>

      <StyledStat>
        {streak && (
          <>
            <StyledStatNumber>
              {streak}
              {streakLevel}
            </StyledStatNumber>
            <span> streak </span>
          </>
        )}
      </StyledStat>

      <StyledStat>
        {maxStreak && maxStreak > 0 && (
          <>
            <StyledStatNumber>{maxStreak}</StyledStatNumber>
            <span> max streak </span>
          </>
        )}
      </StyledStat>

      <StyledStat>
        {averageDuration && (
          <>
            <StyledStatNumber>{averageDuration}</StyledStatNumber>
            <span> avg.&nbsp;mins&nbsp;per&nbsp;day </span>
          </>
        )}
      </StyledStat>

      <StyledStat>
        {averageCount && (
          <>
            <StyledStatNumber>{averageCount}</StyledStatNumber>
            <span> avg.&nbsp;times&nbsp;per&nbsp;day </span>
          </>
        )}
      </StyledStat>
    </Wrapper>
  )
}
