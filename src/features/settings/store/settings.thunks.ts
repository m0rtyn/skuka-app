import { createAsyncThunk } from "@reduxjs/toolkit"
import { FEAT_SETTINGS, COLL_SETTINGS } from "../settings.constants"
import { AppThunkAPI } from "app/store"
import { User } from "firebase/auth"
import { settingsActions } from "./settings.slice"
import { fetchSettings } from "../api/fetch-settings"
import { firestore } from "app/firebase-init"
import { collection, doc, setDoc } from "firebase/firestore"
import { statsActions } from "features/user-stats/store/user-stats.slice"
import { DateRange, Settings } from "../settings.types"

interface Payload {
  user: User
}
const { setSettings } = settingsActions
const { setDateRange } = statsActions

export const fetchSettingsThunk = createAsyncThunk<void, string, AppThunkAPI>(
  `${FEAT_SETTINGS}/getSettings` as const,
  async (userUid, thunkAPI): Promise<void> => {
    const userSettings = await fetchSettings(userUid, firestore)

    userSettings.defaultDateRange =
      userSettings.defaultDateRange ||
      userSettings.defaultChartRange ||
      DateRange.Year

    thunkAPI.dispatch(setSettings(userSettings))
    thunkAPI.dispatch(setDateRange(userSettings.defaultDateRange))
  }
)

export const sendSettingsThunk = createAsyncThunk<void, string, AppThunkAPI>(
  `${FEAT_SETTINGS}/setSettings` as const,
  // eslint-disable-next-line max-statements
  async (userUid, thunkAPI) => {
    const settings = thunkAPI.getState().settings
    const statsColRef = collection(firestore, COLL_SETTINGS)
    const settingsRef = doc(statsColRef, userUid)

    try {
      await setDoc(settingsRef, settings)
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  }
)
