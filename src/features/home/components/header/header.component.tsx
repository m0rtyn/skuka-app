import { StyledWrapper } from "./header.styles"
import { useAppSelector } from "app/store"
import { selectIsTimerStarted } from "features/home/store/main-screen.selectors"
import { Link } from "react-router-dom"
import { AppUpdater } from "../app-updater/app-updater.component"
import { StatusContainer } from "../status-container"

export const Header: React.FC = () => {
  const isTimerStarted = useAppSelector(selectIsTimerStarted)

  return isTimerStarted ?
      <StyledWrapper />
    : <StyledWrapper>
        <StatusContainer />
        <AppUpdater />
      </StyledWrapper>
}
