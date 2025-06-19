import { StyledTooltip } from "shared/components/styled-tooltip.styles"
import { StyledStatusWrapper } from "./header/header.styles"
import { IncognitoStatusIcon } from "./incognito-status"
import { OfflineStatusIcon } from "./offline-status"
import { SignOut } from "./sign-out"
import { useOnline } from "shared/hooks/use-online"
import { auth } from "app/firebase-init"

export const StatusContainer = () => {
  const isOnline = useOnline()
  const isAnonimous = auth.currentUser?.isAnonymous
  const incognitoText =
    "Anonymous users can use timer, but do not have statistics and leaderboard."

  return (
    <StyledStatusWrapper>
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
    </StyledStatusWrapper>
  )
}
