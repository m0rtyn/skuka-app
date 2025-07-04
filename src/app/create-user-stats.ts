import { User } from "firebase/auth"
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where
} from "firebase/firestore"
import { INIT_SERVER_STATS } from "shared/constants"
import { firestore } from "app/firebase-init"

// eslint-disable-next-line max-statements
export const createUserStats = async (user: User | null) => {
  if (user === null) {
    console.info("No authenticated user")
    return
  }

  const statsColRef = collection(firestore, "stats")
  const q = query(statsColRef, where("userId", "==", user.uid), limit(1))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    const userStatsRef = doc(statsColRef)
    const newUserStats = {
      ...INIT_SERVER_STATS,
      userId: user.uid,
      displayName: user.displayName || ""
    }
    setDoc(userStatsRef, newUserStats)
  }
}
