import { TABLET_MIN_WIDTH } from "shared/constants"
import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  animation: ${fadeIn} 0.3s ease-in;

  @media screen and (max-width: ${TABLET_MIN_WIDTH}) {
    padding: 0 4rem;
  }
`

export const ProgressSpiralWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 3em;
`
