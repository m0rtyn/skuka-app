import { User } from "firebase/auth"
import {
  CollectionReference,
  Firestore,
  collection,
  getDocs,
  limit,
  query,
  where
} from "firebase/firestore"
import { Millisecond, ServerUserStatsData, UserStatsData } from "shared/types"

// eslint-disable-next-line max-statements
export async function fetchStats(
  userUid: string,
  firestoreDB: Firestore
): Promise<UserStatsData | null> {
  const statsColSnapshot = await getStatsColSnapshot(firestoreDB, userUid)
  const statsData = statsColSnapshot?.docs[0]?.data()

  if (!statsData) return null

  const userStatsData: UserStatsData = {
    ...statsData,
    firstSessionDate: statsData.firstSessionDate.toMillis() as Millisecond,
    averageCount: null,
    streak: null
  }

  return userStatsData
}

export async function getStatsColSnapshot(
  firestoreDB: Firestore,
  userUid: string
) {
  const statsColRef = collection(
    firestoreDB,
    "stats"
  ) as CollectionReference<ServerUserStatsData>

  const statsQuery = query(
    statsColRef,
    where("userId", "==", userUid),
    limit(1)
  )
  const statsColSnapshot = await getDocs(statsQuery)
  return statsColSnapshot
}
