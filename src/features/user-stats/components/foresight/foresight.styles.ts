import styled from "styled-components"
import { StyledStatNumber } from "../stats-numbers/stats-numbers.styles"

export const Wrapper = styled.div`
  width: 100%;
  grid-area: foresight;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "stat export"
    "progress progress";
  display: grid;
  grid-gap: 1rem;
`

export const StyledStatDate = styled(StyledStatNumber)`
  font-size: 4rem;
`

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  grid-area: progress;

  & .progress-bar {
    height: 100%;
    width: 100%;
  }
`
