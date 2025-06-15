import styled from "styled-components"
import { settingsActions } from "../store/settings.slice"
import { useAppDispatch, useAppSelector } from "app/store"
import { useCallback } from "react"
import { DateRange } from "../settings.types"
import { StyledButton } from "shared/components/styled-button.styles"
import ExportIcon from "shared/assets/svgs/export-icon.svg?react"
import { exportToCSV } from "features/user-stats/utils/user-stats.utils"
import { selectDaysData } from "features/user-stats/store/user-stats.selectors"
import { SettingsOption, StyledLabel } from "./settings-option"
import { selectDefaultDateRange } from "../settings.selectors"

// eslint-disable-next-line max-statements
export const SettingsControls: React.FC = () => {
  const dispatch = useAppDispatch()

  const timerBlinking = useAppSelector(state => state.settings.timerBlinking)
  const sound = useAppSelector(state => state.settings.sound)
  const darkMode = useAppSelector(state => state.settings.darkMode)
  const daysData = useAppSelector(selectDaysData)
  const dateRange = useAppSelector(selectDefaultDateRange)

  const exportToCsvOnClick = useCallback(() => {
    window.open(exportToCSV(daysData))
  }, [daysData])

  return (
    <SettingsWrapper>
      <StyledExportButton
        type='button'
        onClick={exportToCsvOnClick}
        fontSize='2rem'
      >
        <ExportIcon
          color={"currentColor"}
          style={{
            width: "3rem",
            height: "3rem",
            marginRight: "1rem"
          }}
        />
        Statistics Export
      </StyledExportButton>

      {/* <hr style={{ width: "100%" }} /> */}

      <SettingsOption
        label='Dark mode'
        checked={darkMode}
        onChange={() => dispatch(toggleDarkMode())}
      />

      <SettingsOption
        label='Timer blinking'
        checked={timerBlinking}
        onChange={() => dispatch(toggleTimerBlinking())}
      />

      <SettingsOption
        label='Sound'
        checked={sound}
        onChange={() => dispatch(toggleSound())}
      />

      <StyledLabel>
        <span>Default date range (Stats)</span>
        <StyledSelect
          value={dateRange}
          onChange={({ target: { value } }) =>
            dispatch(setDefaultDateRange(value as DateRange))
          }
        >
          <option value={DateRange.AllTime}>All time</option>
          <option value={DateRange.Year}>Current year</option>
          <option value={DateRange.Quarter}>Current quarter</option>
        </StyledSelect>
      </StyledLabel>
    </SettingsWrapper>
  )
}

const {
  setDefaultDateRange,
  toggleSound,
  toggleTimerBlinking,
  toggleDarkMode
} = settingsActions

/* eslint-disable max-lines */
const SettingsWrapper = styled.div`
  margin: 10rem 0;
  display: flex;
  row-gap: 2.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 50%;
`

const StyledSelect = styled.select`
  max-width: 20rem;
`

const StyledInput = styled.input`
  max-width: 20rem;
`

const StyledExportButton = styled(StyledButton)`
  height: auto;
  display: flex;
  flex-direction: row;
  padding: 1rem 2rem;
`
