import {
  DEFAULT_SETTINGS,
  FEATURE_NAME
} from "features/settings/settings.constants"
import { Settings } from "features/settings/settings.types"
import { User } from "firebase/auth"
import {
  CollectionReference,
  Firestore,
  collection,
  doc,
  getDoc
} from "firebase/firestore"

// eslint-disable-next-line max-statements
export const fetchSettings = async (
  userUid: string,
  firestoreDB: Firestore
) => {
  const settingsColRef = collection(
    firestoreDB,
    FEATURE_NAME
  ) as CollectionReference<Settings>

  const settingsRef = await doc(settingsColRef, userUid)
  const settingsData = (await getDoc(settingsRef)).data()

  if (!settingsData) {
    return DEFAULT_SETTINGS
  }

  return settingsData
}
