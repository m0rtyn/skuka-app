import { TABLET_MIN_WIDTH } from "shared/constants"
import styled, { keyframes, css } from "styled-components"

const fading = keyframes`
  0% { opacity: 0%; }
  3% { opacity: 100%; }
  60% { opacity: 100%; }
  100% { opacity: 0%; }
`

const animation = css<Props>`
  animation: ${fading} 1s ease-in-out infinite;
`

interface Props {
  blinking: boolean
  color: string
}
export const StyledCountdown = styled.span<Props>`
  color: ${({ color }) => color} !important;
  ${({ blinking }) => (blinking ? animation : "animation: none;")}
`
