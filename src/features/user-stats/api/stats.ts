import { collection, doc, setDoc } from "@firebase/firestore"
import { firestore } from "app/firebase-init"
import { User } from "firebase/auth"
import { getDocs, limit, query, where } from "firebase/firestore"
import { ServerUserStatsData } from "shared/types"

export async function fetchStats(user: User) {
  const statsColRef = collection(firestore, "stats")
  const q = query(statsColRef, where("userId", "==", user.uid), limit(1))
  const querySnapshot = await getDocs(q)

  const userStatsRef = querySnapshot.docs[0].ref
  const userStatsData = querySnapshot.docs[0].data() as ServerUserStatsData
  return { userStatsData, userStatsRef }
}

export async function sendStats(
  user: User,
  newUserStats: ServerUserStatsData,
  statsId?: string
) {
  if (statsId) {
    const statsRef = doc(firestore, STATS_COLL_NAME, statsId)
    await setDoc(statsRef, newUserStats)
  }

  const statsColRef = collection(firestore, STATS_COLL_NAME)
  const q = query(statsColRef, where("userId", "==", user.uid), limit(1))
  const querySnapshot = await getDocs(q)

  const userStatsRef = querySnapshot.docs[0].ref
  await setDoc(userStatsRef, newUserStats)
}

export const STATS_COLL_NAME = "stats"
export const SETTINGS_COLL_NAME = "settings"
