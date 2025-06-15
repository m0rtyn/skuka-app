import { User } from "firebase/auth"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { statsActions } from "features/user-stats/store/user-stats.slice"
import { sendUserStatsThunk } from "features/user-stats/store/user-stats.thunks"
import { serverDayDataToStoreAdapter } from "shared/utils/adapters"
import { ThunkAPI } from "app/store"
import { firestore } from "app/firebase-init"
import { FEATURE_NAME } from "../main-screen.constants"
import { mainScreenActions } from "./main-screen.slice"
import { sendSessionToServer } from "../api/write-session-to-server"
import { createSessionData } from "shared/utils"
import { Second } from "shared/types"

type Payload = {
  user?: User | null
  seconds: number
}

export const setSessionThunk = createAsyncThunk<void, Payload, ThunkAPI>(
  `${FEATURE_NAME}/setSession` as const,
  // eslint-disable-next-line max-statements
  async ({ user, seconds }, thunkAPI): Promise<void> => {
    if (!user) {
      console.error("User is not defined. Request not sended.", "user: ", user)
      return
    }

    const sessionData = createSessionData(user.uid, seconds as Second)
    const serverDayData = await sendSessionToServer(firestore, sessionData)

    if (!serverDayData) throw new Error("Request failure")

    const dayData = serverDayDataToStoreAdapter(serverDayData)
    const index = thunkAPI
      .getState()
      .userStats.daysData.findIndex(d => d.timestamp === dayData.timestamp)

    if (index === -1) {
      thunkAPI.dispatch(statsActions.addDay(dayData))
    } else {
      thunkAPI.dispatch(statsActions.updateDay({ dayData, index }))
    }

    thunkAPI.dispatch(sendUserStatsThunk({ dayData, user }))

    setTimeout(
      () => thunkAPI.dispatch(mainScreenActions.setRequestStatus("idle")),
      3000
    )
  }
)
