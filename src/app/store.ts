import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { aboutPageSliceReducer } from "features/about-page/about-page.slice"
import { mainScreenSliceReducer } from "features/home/store/main-screen.slice"
import { settingsSliceReducer } from "features/settings/store/settings.slice"
import { userStatsSliceReducer } from "features/user-stats/store/user-stats.slice"
import leaderboardReducer from "features/leaderboard/leaderboard.slice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    // TODO: rename to stats
    userStats: userStatsSliceReducer,
    // TODO: rename to timer or home
    mainScreen: mainScreenSliceReducer,
    aboutPage: aboutPageSliceReducer,
    settings: settingsSliceReducer,
    leaderboard: leaderboardReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
export type ThunkAPI = {
  state: RootState
  dispatch: AppDispatch
}

// TODO: move to app custom hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
