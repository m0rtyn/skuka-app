import { DayData, MockDayData } from "shared/types"
import styles from "./stats-chart.module.css"
import { DAYS_IN_MONTH } from "shared/constants"
import { StyledDateRangeButton } from "features/user-stats/components/user-stats.styles"
import { getChartRangeParams } from "./get-chart-range-params"
import { useChart } from "./use-chart"

interface Props {
  chartData: DayData[]
  foresightData: MockDayData[]
  accumulatedDurations: DayData[]
}
// eslint-disable-next-line max-statements
export const StatsChart: React.FC<Props> = ({
  chartData,
  foresightData,
  accumulatedDurations
}) => {
  const { chartContainerRef, chartRef } = useChart(
    chartData,
    accumulatedDurations,
    foresightData
  )

  const handleZoomIn = () => {
    const [from, to, increment] = getChartRangeParams(chartRef.current)

    if (!from || !to || !increment) return
    if (from + increment > to - increment) return

    const isGreaterThan = to > increment
    chartRef.current?.timeScale().setVisibleLogicalRange({
      from: isGreaterThan ? from + increment : from,
      to: isGreaterThan ? to - increment : to
    })
  }

  const handleZoomOut = () => {
    const [from, to, increment] = getChartRangeParams(chartRef.current)

    if (!from || !to || !increment) return
    if (from - increment < 10) return

    const isGreaterThan = from > increment
    chartRef.current?.timeScale().setVisibleLogicalRange({
      from: isGreaterThan ? from - increment : from,
      to: isGreaterThan ? to + increment : to
    })
  }
  const handleScrollLeft = () => {
    const [from, to, increment] = getChartRangeParams(chartRef.current)

    if (!from || !to || !increment) return

    chartRef.current?.timeScale().setVisibleLogicalRange({
      from: from - increment,
      to: to - increment
    })
  }
  const handleScrollRight = () => {
    const [from, to, increment] = getChartRangeParams(chartRef.current)

    if (!from || !to || !increment) return

    chartRef.current?.timeScale().setVisibleLogicalRange({
      from: from + increment,
      to: to + increment
    })
  }

  const handleResetScroll = () => {
    chartRef.current?.timeScale().setVisibleLogicalRange({
      from: chartData.length - DAYS_IN_MONTH,
      to: chartData.length
    })
  }

  return (
    <>
      <div className={styles.statsChartRangeButtonsWrapper}>
        <StyledDateRangeButton onClick={handleZoomIn}>++</StyledDateRangeButton>

        <StyledDateRangeButton onClick={handleScrollLeft}>
          {"<<"}
        </StyledDateRangeButton>
        <StyledDateRangeButton onClick={handleResetScroll}>
          {"↺"}
        </StyledDateRangeButton>
        <StyledDateRangeButton onClick={handleScrollRight}>
          {">>"}
        </StyledDateRangeButton>

        <StyledDateRangeButton onClick={handleZoomOut}>
          --
        </StyledDateRangeButton>
      </div>

      <div className={styles.statsChartWrapper}>
        <div
          ref={chartContainerRef}
          className={styles.statsChart}
        />
      </div>
    </>
  )
}
