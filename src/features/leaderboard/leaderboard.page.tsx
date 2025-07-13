import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "app/store"
import { getLeaderboardThunk } from "./leaderboard.slice"
import {
  selectLeaderboardUsers,
  selectLeaderboardStatus,
  selectLeaderboardError
} from "./leaderboard.selectors"
import {
  LeaderboardContainer,
  LoadingMessage,
  ErrorMessage,
  StyledList
} from "./leaderboard.styles"
import TriangleIcon from "shared/assets/svgs/triangle.icon.svg?react"
import { LeaderboardItem } from "./components/leaderboard-item.component"
import styles from "./leaderboard.module.css"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "app/firebase-init"

const LeaderboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const leaderboardUsers = useSelector(selectLeaderboardUsers)
  const status = useSelector(selectLeaderboardStatus)
  const error = useSelector(selectLeaderboardError)

  const [user] = useAuthState(auth)

  useEffect(() => {
    if (status === "idle") {
      dispatch(getLeaderboardThunk())
    }
  }, [status, dispatch])

  if (status === "loading" || status === "idle") {
    return <LoadingMessage>Loading leaderboard...</LoadingMessage>
  }

  if (status === "failed") {
    return <ErrorMessage>Error: {error}</ErrorMessage>
  }

  const leaderboard = leaderboardUsers
    // .filter(l => l.displayName)
    .concat(
      ...new Array(9 - leaderboardUsers.length).fill({
        displayName: null
      })
    )

  return (
    <LeaderboardContainer>
      <StyledList>
        {leaderboard.map((leader, index, list) => {
          if (
            leader.displayName === null &&
            list.at(index - 1)?.displayName === null
          )
            return

          return (
            <LeaderboardItem
              leader={leader}
              place={index + 1}
              key={leader.userId || index}
              isCurrentUser={leader.userId === user?.uid}
            />
          )
        })}
      </StyledList>

      <div className={styles.mountain}>
        <TriangleIcon
          width={"100%"}
          height={"100%"}
        />
      </div>
    </LeaderboardContainer>
  )
}

export default LeaderboardPage
