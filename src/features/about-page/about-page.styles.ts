import { AppWrapper } from "shared/styles/app.styles"
import styled from "styled-components"
import { TABLET_MIN_WIDTH } from "shared/constants"

// TODO: move to shared components
export const PageWrapper = styled(AppWrapper)`
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media screen and (max-width: ${TABLET_MIN_WIDTH}) {
    /* padding: 0 4rem; */
  }
`

export const StyledImg = styled.img`
  width: 66%;
  margin: auto;
  pointer-events: none;
  filter: contrast(1.1);
  border-radius: 2rem;
  border: 0.5rem solid var(--c-foreground);

  @media screen and (max-width: ${TABLET_MIN_WIDTH}) {
    width: 100%;
  }
`
