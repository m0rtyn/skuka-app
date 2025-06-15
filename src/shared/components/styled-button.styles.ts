import styled from "styled-components"

type Props = {
  fontSize?: string
  squared?: boolean
}

export const StyledButton = styled.button<Props>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "inherit")};
  aspect-ratio: ${({ squared }) => (squared ? "1/1" : "auto")};
  background-color: var(--c-backgrounden-gray);
  color: inherit;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
