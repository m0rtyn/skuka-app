import styled from "styled-components"

export const Wrapper = styled.div`
  grid-area: stat-numbers;
  display: grid;
  font-size: 2rem;
  grid-template-areas:
    "foresight foresight"
    "average total"
    "streak count";
  grid-gap: 2rem;
  justify-items: flex-start;
  color: var(--c-gray);
  cursor: default;
  user-select: none;

  @media screen and (hover: hover) {
    font-size: 4rem;
  }

  @media screen and (hover: none) and (orientation: landscape) {
    font-size: 2rem;
    grid-template-areas:
      "foresight"
      "average"
      "total"
      "count";
    margin-bottom: 0;
  }
`

export const StyledStatNumber = styled.span`
  font-size: 3rem;
  line-height: 1;
  color: var(--c-foreground);
  font-family: var(--font-mono);

  @media screen and (hover: hover) {
    font-size: 4rem;
  }
`
export const StyledStatUnit = styled.span`
  font-size: 1.5rem;
  line-height: 1;
  color: var(--c-foreground);
  font-family: var(--font-mono);
  padding-left: 0.5rem;

  @media screen and (hover: hover) {
    font-size: 2rem;
  }
`

export const StyledStatIcon = styled.span`
  font-size: 2rem;
  line-height: 1;
  filter: brightness(4) contrast(2) grayscale(1);
  padding-left: 0.5rem;

  @media screen and (hover: hover) {
    font-size: 3rem;
  }
`

export const StyledStat = styled.span`
  display: flex;
  font-size: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  @media screen and (hover: hover) {
    font-size: 2rem;
  }
`
