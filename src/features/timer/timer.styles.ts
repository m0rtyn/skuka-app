import styled from "styled-components"

export const Wrapper = styled.div`
  display: grid;
  max-height: 100%;
  height: 100%;
  grid-template-rows: auto auto;
  grid-template-columns: max-content;
  grid-template-areas:
    "timerButton"
    "tips";
  flex-direction: column;
  align-items: end;
  justify-content: center;
  justify-items: center;
  padding: 0 1rem;
  row-gap: 1rem;

  // @media screen and (hover: none) and (orientation: landscape) {
  //   row-gap: 1rem;
  // }
`

export const BottomTextWrapper = styled.div`
  grid-area: tips;
  margin: 0;
  width: 100%;
  align-self: flex-start;
`
