import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "app/store"
import { FEATURE_NAME } from "../main-screen.constants"
import { setSessionThunk } from "./main-screen.thunks"

export interface MainScreenState {
  errorMessage: string
  slideIndex: number
  requestStatus: "idle" | "loading" | "error" | "loaded"
  timerStatus: "idle" | "started"
}

const initialState: MainScreenState = {
  errorMessage: "",
  slideIndex: 0,
  requestStatus: "idle",
  timerStatus: "idle"
}

export const mainScreenSlice = createSlice({
  name: FEATURE_NAME,
  initialState,
  reducers: {
    toggleSlideIndex: state => {
      state.slideIndex = Number(!state.slideIndex)
    },
    setSlideIndex: (state, action: PayloadAction<number>) => {
      state.slideIndex = action.payload
    },
    // TODO: move state to timer slice
    setTimerStatus: (state, action: PayloadAction<boolean>) => {
      state.timerStatus = action.payload ? "started" : "idle"
    },
    setRequestStatus: (
      state,
      action: PayloadAction<MainScreenState["requestStatus"]>
    ) => {
      state.requestStatus = action.payload
    }
  },

  extraReducers: builder => {
    builder
      // TODO: move states to timer slice
      .addCase(setSessionThunk.fulfilled, (state, action) => {
        state.requestStatus = "loaded"
      })
      .addCase(setSessionThunk.pending, (state, action) => {
        state.requestStatus = "loading"
      })
      .addCase(setSessionThunk.rejected, (state, action) => {
        state.requestStatus = "error"
        state.errorMessage =
          action.error?.message ||
          "Something went wrong, but we don't know what"
      })
  }
})

export const mainScreenActions = {
  ...mainScreenSlice.actions
}

export const mainScreenSelectors = {
  getSlideIndex: (state: RootState) => state[FEATURE_NAME].slideIndex,
  getErrorMessage: (state: RootState) => state[FEATURE_NAME].errorMessage
}

export const mainScreenSliceReducer = mainScreenSlice.reducer
