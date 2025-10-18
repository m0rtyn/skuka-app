import { COLL_DAYS } from "features/home/main-screen.constants"
import {
  Firestore,
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore"
import { ServerDayData } from "shared/types"

export async function fetchDays(
  userId: string,
  firestoreDB: Firestore
): Promise<ServerDayData[]> {
  const daysColRef = collection(firestoreDB, COLL_DAYS)
  const daysQuery = query(
    daysColRef,
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const daysWithSessions = daysColSnapshot.docs.map(
    snap => snap.data() as ServerDayData
  )
  return daysWithSessions
}
