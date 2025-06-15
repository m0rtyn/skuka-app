import { User } from "firebase/auth"
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
  user: User,
  firestoreDB: Firestore
): Promise<ServerDayData[]> {
  const daysColRef = collection(firestoreDB, "days")
  const daysQuery = query(
    daysColRef,
    where("userId", "==", user.uid),
    orderBy("timestamp", "desc")
  )
  const daysColSnapshot = await getDocs(daysQuery)
  const daysWithSessions = daysColSnapshot.docs.map(
    snap => snap.data() as ServerDayData
  )
  return daysWithSessions
}
