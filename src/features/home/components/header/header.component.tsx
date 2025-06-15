import { auth } from "app/firebase-init"
import { StyledTooltip } from "shared/components/styled-tooltip.styles"
// import AppUpdater from "../app-updater/app-updater.component"
import { IncognitoStatusIcon } from "../incognito-status"
import { OfflineStatusIcon } from "../offline-status"
import { SignOut } from "../sign-out"
import { StyledConnectionDiv, StyledWrapper } from "./header.styles"
import { useOnline } from "shared/hooks/use-online"
import { useAppSelector } from "app/store"
import { selectIsTimerStarted } from "features/home/store/main-screen.selectors"
import { Link } from "react-router-dom"

interface Props {}

export const Header: React.FC<Props> = () => {
  const isOnline = useOnline()
  const isAnonimous = auth.currentUser?.isAnonymous
  const isTimerStarted = useAppSelector(selectIsTimerStarted)

  const incognitoText =
    "Anonymous users can use timer, but do not have statistics."

  return isTimerStarted ?
      <StyledWrapper />
    : <StyledWrapper>
        <StyledConnectionDiv>
          <SignOut />
          {!isOnline && <OfflineStatusIcon color='var(--c-foreground)' />}
          {isAnonimous && (
            <StyledTooltip
              content={incognitoText}
              $positionSide='bottom'
              $wrapContent
            >
              <IncognitoStatusIcon color='var(--c-foreground)' />
            </StyledTooltip>
          )}
        </StyledConnectionDiv>
        <nav>
          <Link
            to='/leaderboard'
            style={{ marginRight: "10px" }}
          >
            Leaderboard
          </Link>
          {/* Add other navigation links here if needed */}
        </nav>
        {/* <AppUpdater /> */}
      </StyledWrapper>
}
