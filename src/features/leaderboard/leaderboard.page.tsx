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
  gap: 1rem;

  p {
    font-family: var(--font-mono, monospace);
  }

  & > div {
    display: flex;
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
  const users = useSelector(selectLeaderboardUsers)
  const status = useSelector(selectLeaderboardStatus)
  const error = useSelector(selectLeaderboardError)

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeaderboardData())
    }
    console.log(users)
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
        {users.map((user, index) => (
          <ListItem key={user.userId}>
            <UserStats>
              <Rank>{index + 1}</Rank>
              <UserName>{getUserNicknameFromId(user.userId)}</UserName>
              <div>
                <p>Overall: {Math.round(user?.totalDuration)} mins</p>
                <p>Count: {user?.count}</p>
                {/* <p>Last Session: {user.lastSessionDate}</p> */}
              </div>
            </UserStats>
          </ListItem>
        ))}
      </List>
    </LeaderboardContainer>
  )
}
