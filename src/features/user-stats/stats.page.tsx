import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { useAppSelector } from "app/store"
import {
  selectDaysByDateRange,
  selectIsLoading
} from "./store/user-stats.selectors"
import {
  StatsWithCalWrapper,
  StyledWrapper
} from "./components/user-stats.styles"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "app/firebase-init"
import "react-tooltip/dist/react-tooltip.css"
import { HeatCalendar } from "./components/heat-calendar"
import { ChartRangeSwitcher } from "./components/range-switcher.componets"

// TODO: rename to StatisticsPage
// eslint-disable-next-line max-statements
export const StatsPage: React.FC = () => {
  const [user, authLoading] = useAuthState(auth)
  const isLoading = useAppSelector(selectIsLoading)
  const daysDataByDateRange = useAppSelector(selectDaysByDateRange)

  return (
    <>
      <StatsWithCalWrapper>
        <ChartRangeSwitcher />

        <StatsNumbers />

        <HeatCalendar
          dayData={daysDataByDateRange}
          loading={authLoading || isLoading}
        />
      </StatsWithCalWrapper>

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
    </>
  )
}
