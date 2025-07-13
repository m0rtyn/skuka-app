// import { DevPage } from "features/dev-page"
import { SignInPage } from "features/sign-in-page/sign-in-page"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { RequireAuth } from "shared/components/require-auth"
import { AboutPage } from "features/about-page/about-page"
import { Tutorial } from "features/about-page/components/tutorial/tutorial.component"
import { HowItWorks } from "features/about-page/components/how-it-works/how-it-works.component"
import { About } from "features/about-page/components/about.component"
import { SettingsPage } from "features/settings"
import { lazy, Suspense } from "react"
import { StyledSpinner } from "shared/components/styled-spinner.styles"

const MainLayoutLazy = lazy(() => import("features/home"))
const TimerPageLazy = lazy(() => import("features/timer/timer.component"))
const StatsPageLazy = lazy(() => import("features/user-stats"))
const LeaderboardPageLazy = lazy(() => import("features/leaderboard"))

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<SignInPage />}
      />

      <Route
        element={
          <RequireAuth>
            <Suspense fallback={"Loading..."}>
              <MainLayoutLazy />
            </Suspense>
          </RequireAuth>
        }
      >
        <Route
          path='/'
          element={<Navigate to='/timer' />}
        />

        <Route
          path='timer'
          element={
            <Suspense fallback={"Loading..."}>
              <TimerPageLazy />
            </Suspense>
          }
        />

        <Route
          path='user-stats'
          element={
            <Suspense fallback={<StyledSpinner />}>
              <StatsPageLazy />
            </Suspense>
          }
        />

        <Route
          path='leaderboard'
          element={
            <Suspense fallback={<StyledSpinner />}>
              <LeaderboardPageLazy />
            </Suspense>
          }
        />

        {/* <Route
          path='chart'
          element={<UserChart />}
        /> */}
      </Route>

      <Route
        path='/about'
        element={<AboutPage />}
      >
        <Route
          path=''
          element={<About />}
        ></Route>
        <Route
          path='tutorial'
          element={<Tutorial />}
        ></Route>
        <Route
          path='how-it-works'
          element={<HowItWorks />}
        ></Route>
      </Route>

      <Route
        path='/settings'
        element={<SettingsPage />}
      />

      {/* <Route path="/dev" element={<DevPage />} /> */}

      <Route
        path='*'
        element={<NoMatch />}
      />
    </Routes>
  )
}

const NoMatch = () => {
  return (
    <>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </>
  )
}
