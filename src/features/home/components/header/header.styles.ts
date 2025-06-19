import { TABLET_MIN_WIDTH } from "shared/constants"
import styled from "styled-components"

export const StyledWrapper = styled.header`
  width: 100%;
  min-height: 6.5rem; // NOTE: hardcoded height to prevent jumping when header is hidden
  display: flex;
  white-space: nowrap;
  align-items: baseline;
  justify-content: space-between;
  color: var(--c-gray);
  font-size: 1rem;
  padding: 1rem;
  z-index: 1;

  @media screen and (min-width: ${TABLET_MIN_WIDTH}) {
    padding: 2rem 1rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const StyledDiv = styled.div`
  display: flex;
  align-items: baseline;
  column-gap: 2rem;
`

export const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 2rem;
`
