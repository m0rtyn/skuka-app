import styled from "styled-components"

export const Wrapper = styled.span`
  color: var(--c-gray);
  cursor: default;
  margin-bottom: 0;

  display: grid;
  grid-template-areas:
    "arrow next"
    "percent percent";
  grid-template-columns: auto;
  gap: 1rem;
  justify-items: center;
  justify-content: center;
  align-items: center;
`

export const StyledTip = styled.span`
  grid-area: arrow;
  font-size: 2.5rem;
  color: var(--c-foreground);

  @media screen and (orientation: landscape) {
    line-height: 1.5;
  }
`

export const StageWrapper = styled.div`
  grid-template-areas:
    "number description"
    "number description";
  grid-template-columns: min-content auto;
  grid-column-gap: 1rem;
  display: grid;
  width: 100%;
  font-size: 2rem;
  line-height: 1.5;
  text-align: left;
  align-items: center;

  @media screen and (hover: none) and (orientation: landscape) {
    grid-template-areas: "number number";
  }
`

export const StyledStageNumber = styled.code`
  grid-row: 1 / 3;
  grid-area: number;
  font-size: 6rem;
  line-height: 1;
`

export const StyledUnits = styled.span`
  align-self: end;

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const StyledDesc = styled.span`
  align-self: start;

  @media screen and (hover: none) and (orientation: landscape) {
    display: none;
  }
`

export const StyledTriangle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: "❯";
    font-size: 3rem;
  }
`

export const StyledRatio = styled.span`
  grid-area: percent;
  color: var(--c-gray);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--c-gray);
`
