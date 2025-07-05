import {
  selectActiveDaysByRange,
  selectAverageCount,
  selectAverageDuration,
  selectDaysByDateRange,
  selectMaxStreakByRange,
  selectStreak,
  selectTotalHours
} from "features/user-stats/store/user-stats.selectors"
import { useAppSelector } from "app/store"
import { Foresight } from "../foresight/foresight.component"
import {
  StyledStat,
  StyledStatIcon,
  StyledStatNumber,
  StyledStatUnit,
  Wrapper
} from "./stats-numbers.styles"
import { getStreakLevel } from "features/user-stats/utils/get-streak"
import { getMedianSessionDuration } from "features/user-stats/utils/user-stats.utils"

export const StatsNumbers: React.FC = () => {
  const activeDays = useAppSelector(selectActiveDaysByRange)
  const allDays = useAppSelector(selectDaysByDateRange)
  const maxStreak = useAppSelector(selectMaxStreakByRange)
  const averageDuration = useAppSelector(selectAverageDuration)
  const averageCount = useAppSelector(selectAverageCount)
  const totalHours = useAppSelector(selectTotalHours)
  const streak = useAppSelector(selectStreak)

  const streakLevel = getStreakLevel(streak)
  const medianDuration = getMedianSessionDuration(allDays)

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
              <StyledStatIcon>{streakLevel}</StyledStatIcon>
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
            <StyledStatNumber>
              {averageDuration}
              <StyledStatUnit>min</StyledStatUnit>
            </StyledStatNumber>
            <span> average&nbsp;per&nbsp;day </span>
          </>
        )}
      </StyledStat>

      <StyledStat>
        {medianDuration && (
          <>
            <StyledStatNumber>
              {medianDuration}
              <StyledStatUnit>min</StyledStatUnit>
            </StyledStatNumber>
            <span> median&nbsp;per&nbsp;day </span>
          </>
        )}
      </StyledStat>

      {/* <StyledStat>
        {averageCount && (
          <>
            <StyledStatNumber>{averageCount}</StyledStatNumber>
            <span> avg.&nbsp;times&nbsp;per&nbsp;day </span>
          </>
        )}
      </StyledStat> */}
    </Wrapper>
  )
}
