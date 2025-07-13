import { formatDistanceToNow } from "date-fns"
import { Rank, UserName, ListItem } from "../leaderboard.styles"
import { LeaderboardData } from "../leaderboard.types"

export const LeaderboardItem: React.FC<{
  leader: LeaderboardData
  place: number
  isCurrentUser?: boolean
}> = ({ leader, place, isCurrentUser = false }) => {
  const lastSession =
    leader.lastSessionTime ?
      formatDistanceToNow(new Date(leader.lastSessionTime), {
        addSuffix: true,
        includeSeconds: false
      }).replace("about ", "~")
    : null
  const maxStreak = leader.maxStreak || null
  const total = Math.round(leader?.totalDuration) || null

  return (
    <ListItem isCurrentUser={isCurrentUser}>
      <UserName>
        <Rank>#{place}</Rank>
        {leader.displayName || "Let's join the leaderboard!"}
        {isCurrentUser && " (You)"}
      </UserName>

      <div className='stats'>
        {maxStreak && (
          <span>
            Max Streak
            <b>{maxStreak}</b>
          </span>
        )}

        {total && (
          <span>
            Overall Time
            <b>{total} mins</b>
          </span>
        )}

        {lastSession && (
          <span>
            Last Session
            <b>{lastSession}</b>
          </span>
        )}
      </div>
    </ListItem>
  )
}
