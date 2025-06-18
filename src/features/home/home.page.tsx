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
import { StyledFooterLink } from "shared/components/footer/footer.styles"
import { SwipeCallback, useSwipeable } from "react-swipeable"
import { skipSwipeOnCalendar } from "./utils"
import { ConfigurationOptions } from "react-swipeable/es/types"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, loading] = useAuthState(auth)
  const pathTo = location.pathname === "/timer" ? "/user-stats" : "/timer"

  const onSwiped: SwipeCallback = e =>
    skipSwipeOnCalendar(e, () => navigate(pathTo))

  const handlers = useSwipeable({
    ...SWIPE_CONFIG,
    onSwiped
  })

  const isUserExist = !user?.isAnonymous
  const isTimerStarted = useAppSelector(selectIsTimerStarted)

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
    </Wrapper>
  )
}

const LinkSwitcher: React.FC = () => {
  const { pathname } = useLocation()

  const linkRoute = pathname === "/timer" ? "/user-stats" : "/timer"
  const linkText = pathname === "/timer" ? "to Timer" : "to Stats"
  const LinkIcon = pathname === "/timer" ? StatsIcon : TimerIcon

  return (
    <StyledFooterLink
      to={linkRoute}
      title={linkText}
    >
      <LinkIcon
        width='3rem'
        height='3rem'
        title={linkText}
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
