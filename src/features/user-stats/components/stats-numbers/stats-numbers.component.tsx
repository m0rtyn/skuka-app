import {
  selectActiveDays,
  selectAverageCount,
  selectAverageDuration,
  selectMaxStreak,
  selectStreak,
  selectTotalHours
} from "features/user-stats/store/user-stats.selectors"
import { useAppSelector } from "app/store"
import { Foresight } from "../foresight/foresight.component"
import { StyledStat, StyledStatNumber, Wrapper } from "./stats-numbers.styles"
import { getStreakLevel } from "features/user-stats/utils/get-streak"

export const StatsNumbers: React.FC = () => {
  const activeDays = useAppSelector(selectActiveDays)
  const maxStreak = useAppSelector(selectMaxStreak)
  const averageDuration = useAppSelector(selectAverageDuration)
  const averageCount = useAppSelector(selectAverageCount)
  const totalHours = useAppSelector(selectTotalHours)
  const streak = useAppSelector(selectStreak)

  const streakLevel = getStreakLevel(streak)

  const isTotalHoursExist = totalHours !== null && totalHours > 0
  const isAverageDurationExist = averageDuration !== null && averageDuration > 0
  const isStreakExist = streak !== null && streak > 0
  const isMaxStreakExist = maxStreak !== null && maxStreak > 0

  return (
    <Wrapper>
      {isTotalHoursExist && isAverageDurationExist && (
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
            <StyledStatNumber>{activeDays.length}</StyledStatNumber>{" "}
            active&nbsp;days
          </>
        )}
      </StyledStat>

      <StyledStat>
        {isStreakExist && (
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
        {isMaxStreakExist && (
          <>
            <StyledStatNumber>{maxStreak}</StyledStatNumber>
            <span> max streak </span>
          </>
        )}
      </StyledStat>

      <StyledStat>
        {isAverageDurationExist && (
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
