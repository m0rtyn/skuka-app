import { StatsNumbers } from "./components/stats-numbers/stats-numbers.component"
import { StatsWithCalWrapper } from "./components/user-stats.styles"
import "react-tooltip/dist/react-tooltip.css"
import { HeatCalendar } from "./components/heat-calendar"
import { ChartRangeSwitcher } from "./components/range-switcher.componets"
import { memo } from "react"

// TODO: rename to StatisticsPage
// eslint-disable-next-line max-statements
export const StatsPage: React.FC = memo(() => {
  return (
    <StatsWithCalWrapper>
      <ChartRangeSwitcher />

      <StatsNumbers />

      <HeatCalendar />
    </StatsWithCalWrapper>

    // {/* // NOTE: FOR STATS DEBUGGING */}
    //   {/* {userStatistics && (
    //     <button
    //     onClick={() =>
    //       countStats(userChartData?.[0].data || [], userStatistics)
    //     }
    //     >
    //     Count Stats
    //     </button>
    //   )} */}
    // {/* </> */}
  )
})
