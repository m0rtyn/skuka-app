import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "app/store"
import { fetchLeaderboardData } from "./leaderboard.slice"
import {
  selectLeaderboardUsers,
  selectLeaderboardStatus,
  selectLeaderboardError
} from "./leaderboard.selectors"
import styled from "styled-components"
import { getUserNicknameFromId } from "./leaderboard.utils"

const LeaderboardContainer = styled.div`
  padding: 3rem;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  border-radius: var(--b-radius, 1rem);
  display: flex;
  border: 1px solid #ddd;
  padding: 2rem 1rem;
  justify-content: space-between;
  align-items: center;
`

const UserName = styled.span`
  font-weight: bold;
`

const UserStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.5rem;

  & > div {
    display: flex;
  }

  p {
    font-family: var(--font-mono, monospace);
  }
`

const Rank = styled.span`
  font-size: 4rem;
  font-weight: bold;
`

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2em;
`

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: red;
`

export const LeaderboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const leaderboard = useSelector(selectLeaderboardUsers)
  const status = useSelector(selectLeaderboardStatus)
  const error = useSelector(selectLeaderboardError)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeaderboardData())
    }
  }, [status, dispatch])

  if (status === "loading" || status === "idle") {
    return <LoadingMessage>Loading leaderboard...</LoadingMessage>
  }

  if (status === "failed") {
    return <ErrorMessage>Error: {error}</ErrorMessage>
  }

  return (
    <LeaderboardContainer>
      <List>
        {leaderboard
          .filter(l => l.displayName)
          .map((leader, index) => (
            <ListItem key={leader.userId}>
              <UserStats>
                <Rank>{index + 1}</Rank>
                <UserName>{leader.displayName}</UserName>
                <div>
                  <p className='totalDuration'>
                    Overall: {Math.round(leader?.totalDuration)} mins
                  </p>
                  <p className='count'>Count: {leader?.count}</p>
                  {leader.lastSessionTime ?
                    <p className='lastSession'>
                      Last Session:{" "}
                      {new Date(leader.lastSessionTime)
                        .toISOString()
                        .slice(0, 10)}
                    </p>
                  : null}
                </div>
              </UserStats>
            </ListItem>
          ))}
      </List>
    </LeaderboardContainer>
  )
}
