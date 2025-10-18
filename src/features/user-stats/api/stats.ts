import { firestore } from "app/firebase-init"
import { User } from "firebase/auth"
import { collection, doc, setDoc, getDocs, limit, query, where } from "firebase/firestore"
import { DbStatsData } from "shared/types"
import { COLL_STATS } from "../user-stats.constants"

export async function fetchStats(user: User) {
  const statsColRef = collection(firestore, COLL_STATS)
  const q = query(statsColRef, where("userId", "==", user.uid), limit(1))
  const querySnapshot = await getDocs(q)

  const userStatsRef = querySnapshot.docs[0].ref
  const userStatsData = querySnapshot.docs[0].data() as DbStatsData
  return { userStatsData, userStatsRef }
}

export async function sendUpdatedStats(
  userId: string,
  newUserStats: DbStatsData,
  statsId?: string
) {
  if (statsId) {
    const statsDocRef = doc(firestore, COLL_STATS, statsId)
    await setDoc(statsDocRef, newUserStats)
    return;
  }

  const statsColRef = collection(firestore, COLL_STATS)
  const q = query(statsColRef, where("userId", "==", userId), limit(1))
  const querySnapshot = await getDocs(q)

  const statsRef = querySnapshot.docs[0].ref
  await setDoc(statsRef, newUserStats)
}
