import { AppRouter } from "app/app-router"
import { auth } from "app/firebase-init"
import {
  fetchChartDataThunk,
  fetchStatsThunk
} from "features/user-stats/store/user-stats.thunks"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useAppDispatch, useAppSelector } from "app/store"
import { fetchSettingsThunk } from "features/settings/store/settings.thunks"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "./global-styles"
import { darkTheme, lightTheme } from "./theme"

export const App = () => {
  const [user] = useAuthState(auth)
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector(state => state.settings.darkMode)

  useEffect(() => {
    if (!user || user.isAnonymous) return

    dispatch(fetchSettingsThunk(user))
    dispatch(fetchChartDataThunk(user))
    dispatch(fetchStatsThunk(user))
  }, [dispatch, user])

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  )
}
