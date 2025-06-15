import { useAppDispatch, useAppSelector } from "app/store"
import { DateRange, YearString } from "features/settings/settings.types"
import { FC } from "react"
import {
  StyledChartRangeSwitcher,
  StyledDateRangeButton,
  StyledDateRangeSelect
} from "./user-stats.styles"
import { statsActions } from "../store/user-stats.slice"
import { getYear } from "date-fns"
import CollapseRangeIcon from "shared/assets/svgs/collapse-content.icon.svg?react"
import ExpandedRangeIcon from "shared/assets/svgs/expand-content.icon.svg?react"
import {
  selectDateRange,
  selectFirstSessionDate
} from "../store/user-stats.selectors"

export const ChartRangeSwitcher: FC = () => {
  const dispatch = useAppDispatch()
  const dateRange = useAppSelector(selectDateRange)
  const firstSessionDateMs = useAppSelector(selectFirstSessionDate)

  const handleDateRangeToggle = () => {
    dispatch(statsActions.toggleDateRange())
  }

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChartRange = e.target.value as DateRange | YearString
    dispatch(statsActions.setDateRange(newChartRange))
  }

  const firstSessionYear = getYear(firstSessionDateMs || Date.now())
  const yearsOfUserData = new Array(getYear(Date.now()) - firstSessionYear)
    .fill(null)
    .map((_, i) => getYear(Date.now()) - 1 - i)

  return (
    <StyledChartRangeSwitcher>
      <label htmlFor='date-range'>Stats for {dateRange}</label>

      <StyledDateRangeButton
        onClick={handleDateRangeToggle}
        title={`Switch to ${dateRange === DateRange.AllTime ? DateRange.Year : DateRange.AllTime}`}
        id='date-range'
      >
        {dateRange === DateRange.AllTime ?
          <CollapseRangeIcon />
        : <ExpandedRangeIcon />}
      </StyledDateRangeButton>

      <StyledDateRangeSelect
        onChange={handleDateRangeChange}
        value={dateRange}
      >
        <option value={DateRange.AllTime}>All time</option>
        <option value={DateRange.Year}>Year</option>
        <option value={DateRange.Quarter}>Quarter</option>

        {yearsOfUserData.map(y => (
          <option
            key={y}
            value={y}
          >
            {y}
          </option>
        ))}
      </StyledDateRangeSelect>
    </StyledChartRangeSwitcher>
  )
}
