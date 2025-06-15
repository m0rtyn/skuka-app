import { StyledButton } from "shared/styles/app.styles"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 5vh 0;
  animation: ${fadeIn} 0.5s ease-in-out;
  // margin: 15vh 0;

  @media screen and (width < 768px) {
    padding: 1vh 0;
  }

  @media screen and (orientation: landscape) {
    // margin: 4vh 0;
  }

  @media screen and (pointer: fine) {
    // margin: 10vh 0;
  }
`

export const StatsWithCalWrapper = styled.div`
  min-width: 28rem;
  height: 100%;
  display: grid;
  grid-template-areas:
    "range-switch"
    "stat-numbers"
    "calendar";
  grid-template-rows: min-content min-content auto;
  gap: 4rem;

  @media screen and (hover: none) and (orientation: landscape) {
    grid-template-areas:
      "range-switch range-switch"
      "stat-numbers calendar";
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: center;
    min-width: auto;
  }
`

export const ChartWrapper = styled.div`
  min-width: 28rem;
  height: 100%;
  display: grid;
  gap: 2.5rem;

  @media screen and (hover: none) and (orientation: landscape) {
    grid-template-areas:
      "range-switch"
      "chart";
    grid-template-columns: 1fr 2fr;
    grid-template-rows: min-content 4fr;
    gap: 2rem;
    align-items: center;
    min-width: auto;
  }
`

export const StyledChartRangeSwitcher = styled.div`
  grid-area: range-switch;
  display: grid;
  grid-template-areas:
    "label label"
    "button select";
  grid-template-columns: min-content auto;
  min-width: 50%;
  max-width: 28rem;
  gap: 1rem;
  font-weight: 700;
  font-size: 2.5rem;
  cursor: pointer;
  align-items: center;
  align-self: flex-start;
  justify-self: center;
  margin-top: 0;

  @media screen and (hover: none) and (orientation: landscape) {
    font-size: 1.5rem;
  }

  & > label {
    grid-area: label;
    font-size: 3rem;
    font-weight: 700;
  }
`

export const StyledDateRangeButton = styled(StyledButton)`
  margin: 0 auto;
  grid-area: button;
  font-size: 1.5rem;
  padding: 0.5rem;
  color: var(--c-foreground);
  display: flex;
  align-items: center;
  font-family: monospace;

  &::after {
    display: none;
  }

  & > svg {
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1;
  }
`

export const StyledDateRangeSelect = styled.select`
  grid-area: select;
  width: 100%;
  margin: 0 auto;
  font-size: 2rem;
  padding: 0.5rem 1.5rem;
  color: var(--c-foreground);
`
