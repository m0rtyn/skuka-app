import styled from "styled-components"

export const LeaderboardContainer = styled.div`
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const StyledList = styled.ul`
  display: flex;
  justify-content: flex-start;
  // grid-template-rows: repeat(9, minmax(100px, auto));
  list-style-type: none;
  padding: 0;
  z-index: 1;
  position: relative;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  max-height: 80vh;
  // overflow-y: hidden;
  flex-shrink: 1;
  overflow: hidden;
`

export const ListItem = styled.li<{ isCurrentUser?: boolean }>`
  border-radius: var(--b-radius, 1rem);
  background-color: var(--c-background);
  display: grid;
  grid-template-columns: min-content auto auto;
  grid-template-areas:
    "rank name name name"
    "rank stats stats stats";
  grid-template-rows: auto 1fr;
  border: 1px solid #ddd;
  padding: 1rem 2rem;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 1;
  gap: 1rem;
  font-size: 1.3rem;
  min-height: 8rem;
  ${props => props.isCurrentUser && `filter: invert(1);`}

  & > .stats {
    display: grid;
    grid-area: stats;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    & > span > b {
      display: block;
    }
  }
`

export const UserName = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  grid-area: name;
  text-align: center;

  & > b {
    margin-left: 1rem;
  }
`

export const StyledStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  // grid-area: stats;

  & > .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    & > span > b {
      display: block;
    }
  }
`

export const Rank = styled.span`
  grid-area: rank;
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1;
`

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2em;
`

export const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: red;
`
