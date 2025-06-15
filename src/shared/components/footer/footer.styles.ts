import { Link } from "react-router-dom"
import styled from "styled-components"

export const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100%;
  font-size: 1rem;
  color: var(--c-gray);
  min-height: 7.5rem;

  @media screen and (hover: hover) {
    padding: 0 4rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const StyledFooterLink = styled(Link)`
  color: var(--c-foreground);
  font-size: 1.5rem;
  background-color: var(--c-backgrounden-gray);
  border-radius: 50%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: none;
  height: 5rem;
`
