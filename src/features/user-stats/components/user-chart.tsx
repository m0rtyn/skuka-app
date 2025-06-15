import { StatsChart } from "./stats-chart/stats-chart.component"
import { useMemo } from "react"
import { useAppSelector } from "app/store"
import { getUserChartData } from "../utils/user-stats.utils"
import {
  selectDaysData,
  selectIsLoading,
  selectUserStats
} from "../store/user-stats.selectors"
import { StyledSpinner } from "shared/components/styled-spinner.styles"
import { NoUserStatsMessage } from "./no-user-stats-message"
import { ChartWrapper, StyledWrapper } from "./user-stats.styles"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "app/firebase-init"
import "react-tooltip/dist/react-tooltip.css"
// WIP
// eslint-disable-next-line max-statements
const UserChart: React.FC = () => {
  const [user, authLoading] = useAuthState(auth)
  const userStatistics = useAppSelector(selectUserStats)
  const userDaysData = useAppSelector(selectDaysData)
  const isLoading = useAppSelector(selectIsLoading)

  const daysDataByDateRange = useMemo(() => {
    // if (dateRange === ChartRange.AllTime) return userDaysData
    return userDaysData

    // const startDate = threeMonthsBeforeDate
    // const daysData = userDaysData.filter(
    //   dayData => dayData.timestamp >= startDate.getTime()
    // )
    // return daysData
    // }, [dateRange, userDaysData])
  }, [userDaysData])

  const statsByDateRange = useMemo(() => {
    if (!userStatistics) return null
    // if (dateRange === ChartRange.AllTime) return userStatistics

    return userStatistics

    // const { totalDuration, count } = countStats(daysDataByDateRange)
    // const stats: UserStatsData = {
    //   ...userStatistics,
    //   firstSessionDate: threeMonthsBeforeDate.getTime(),
    //   userId: user?.uid || 'no-user',
    //   totalDuration,
    //   count
    // }

    // return stats
    // }, [dateRange, daysDataByDateRange, user?.uid, userStatistics])
  }, [userStatistics])

  const [userChartData, foresightData, accumulatedDuration] = useMemo(() => {
    if (!statsByDateRange || !userDaysData) return [[], [], []]

    return getUserChartData(daysDataByDateRange, statsByDateRange)
  }, [daysDataByDateRange, statsByDateRange, userDaysData])

  const isChartDataExist = userChartData?.length !== 0

  return (
    <StyledWrapper>
      {authLoading || isLoading ?
        <StyledSpinner />
      : isChartDataExist ?
        <ChartWrapper>
          <StatsChart
            chartData={userChartData}
            foresightData={foresightData}
            accumulatedDurations={accumulatedDuration}
          />
          {/* <ChartRangeSwitcher dateRange={dateRange} /> */}
        </ChartWrapper>
      : <NoUserStatsMessage />}

      {/* // NOTE: FOR STATS DEBUGGING */}
      {/* {userStatistics && (
        <button
        onClick={() =>
          countStats(userChartData?.[0].data || [], userStatistics)
        }
        >
        Count Stats
        </button>
      )} */}
    </StyledWrapper>
  )
}

export default UserChart
