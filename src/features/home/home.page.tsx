import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useAppSelector } from "app/store"
import { Header } from "./components/header/header.component"
import { auth } from "app/firebase-init"
import { Wrapper } from "./home.styles"
import { Footer } from "../../shared/components/footer/footer.component"
import { selectIsTimerStarted } from "./store/main-screen.selectors"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import TimerIcon from "shared/assets/svgs/timer.icon.svg?react"
import StatsIcon from "shared/assets/svgs/stats.icon.svg?react"
import LeaderboardIcon from "shared/assets/svgs/leaderboard.icon.svg?react"
import { StyledFooterLink } from "shared/components/footer/footer.styles"
import { SwipeCallback, useSwipeable } from "react-swipeable"
import { skipSwipeOnCalendar } from "./utils"
import { ConfigurationOptions } from "react-swipeable/es/types"
import { Tooltip } from "react-tooltip"

const PATHS = ["/timer", "/user-stats", "/leaderboard"]

const Home: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, loading] = useAuthState(auth)

  const isTimerStarted = useAppSelector(selectIsTimerStarted)

  const onSwiped: SwipeCallback = e => {
    if (loading || isTimerStarted) return
    const isBack = e.dir === "Right"
    const nextPathIndex =
      (PATHS.indexOf(location.pathname) + (isBack ? -1 : 1) + PATHS.length) %
      PATHS.length
    const pathTo = PATHS[nextPathIndex]
    return skipSwipeOnCalendar(e, () => navigate(pathTo))
  }

  const handlers = useSwipeable({
    ...SWIPE_CONFIG,
    onSwiped
  })

  const isUserExist = !user?.isAnonymous

  return (
    <Wrapper {...handlers}>
      <Header />

      <Outlet />

      <Footer
        isUserExist={isUserExist}
        showLinks={!isTimerStarted}
        showSwitcher={!isTimerStarted}
      >
        <LinkSwitcher />
      </Footer>

      <Tooltip id='react-tooltip' />
    </Wrapper>
  )
}

const LinkSwitcher: React.FC = () => {
  const { pathname } = useLocation()

  const { route, text, Icon } = getLinkData(pathname)

  return (
    <StyledFooterLink
      to={route}
      title={text}
    >
      →
      <Icon
        width='3rem'
        height='3rem'
      />
    </StyledFooterLink>
  )
}

const SWIPE_CONFIG: ConfigurationOptions = {
  delta: 16, // min distance(px) before a swipe starts. *See Notes*
  preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
  trackTouch: true, // track touch input
  trackMouse: true, // track mouse input
  rotationAngle: 0, // set a rotation angle
  swipeDuration: 500, // allowable duration of a swipe (ms). *See Notes*
  touchEventOptions: { passive: true } // options for touch listeners (*See Details*)
}

export default Home

function getLinkData(pathname: string): {
  route: string
  text: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
} {
  const curIndex = PATHS.indexOf(pathname)
  const nextIndex = (curIndex + 1) % PATHS.length
  const route = PATHS[nextIndex]
  const text =
    pathname === "/timer" ? "to User Stats"
    : pathname === "/user-stats" ? "to Leaderboard"
    : "to Timer"
  const Icon =
    pathname === "/timer" ? StatsIcon
    : pathname === "/user-stats" ? LeaderboardIcon
    : TimerIcon
  return { route, text, Icon }
}
