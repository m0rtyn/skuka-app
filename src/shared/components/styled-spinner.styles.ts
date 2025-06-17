import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const spinner = keyframes`
  0% { transform: rotate(0); border-bottom-color: var(--c-foreground); }
  33%,  66% { border-bottom-color: var(--c-foreground) }
  100% { transform: rotate(3600deg); border-bottom-color: var(--c-foreground); }
`

export const StyledSpinner = styled.div`
  width: auto;
  min-width: 28rem; /* NOTE: hardcoded to match the width of the user stats */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  background-color: var(--c-background);
  position: relative;
  animation: ${fadeIn} 13s linear infinite;

  &::after {
    content: "";
    display: block;

    animation: ${spinner} 13s linear infinite;

    width: 50%;
    aspect-ratio: 1;

    border-radius: 50%;
    border-width: 1.5rem;
    border-style: solid;
    border-color: var(--c-foreground);
  }
`
