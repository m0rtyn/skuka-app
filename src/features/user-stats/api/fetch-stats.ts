import {
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  collection,
  getDocs,
  query,
  where 
} from "firebase/firestore"
import { Millisecond, DbStatsData, AppStatsData, Minute } from "shared/types"
import { COLL_STATS } from "../user-stats.constants"

export async function fetchStats(
  userUid: string,
  firestoreDB: Firestore
): Promise<AppStatsData | null> {
  const statsColSnapshot = await getStatsColSnapshot(firestoreDB, userUid)
  const firstStatsDoc = statsColSnapshot.docs[0]

  if (!statsColSnapshot || statsColSnapshot.docs.length === 0) return null
  const statsData =
    statsColSnapshot.docs.length > 1 ?
      await mergeStatsDocuments(statsColSnapshot.docs)
    : firstStatsDoc.data()

  if (!statsData) return null

  const userStatsData: AppStatsData = {
    ...statsData,
    firstSessionDate: statsData.firstSessionDate.toMillis() as Millisecond,
    averageCount: null,
    streak: null,
    statsId: firstStatsDoc.id
  }

  return userStatsData
}

async function mergeStatsDocuments(
  docs: Array<StatsSnapshotDoc>,
): Promise<DbStatsData> {
  const mergedStats = docs.reduce(mergeStat, {} as DbStatsData)

  // Write merged stats and delete duplicates
  // const batch = writeBatch(firestoreDB)
  // const statsColRef = collection(firestoreDB, STATS_COLL_NAME)
  // Keep the first document and update it with merged data
  // const primaryDocRef = doc(statsColRef, docs[0].id)
  // batch.set(primaryDocRef, mergedStats)
  // // Delete duplicate documents
  // docs.slice(1).forEach(dupDoc => {
  //   const dupDocRef = doc(statsColRef, dupDoc.id)
  //   batch.delete(dupDocRef)
  // })
  // await batch.commit()

  return mergedStats
}

function mergeStat(acc: DbStatsData, doc: StatsSnapshotDoc): DbStatsData {
    const d = doc.data()

    const totalDuration = ((acc.totalDuration || 0) +
      (d.totalDuration || 0)) as Minute
    const count = (acc.count || 0) + (d.count || 0)
    const firstSessionDate =
      acc.firstSessionDate && d.firstSessionDate ?
        Timestamp.fromMillis(
          Math.min(
            acc.firstSessionDate.toMillis(),
            d.firstSessionDate.toMillis()
          )
        )
      : acc.firstSessionDate || d.firstSessionDate
    const averageDuration =
      acc.averageDuration && d.averageDuration ?
        ((acc.averageDuration + d.averageDuration) / 2) as Minute
      : acc.averageDuration || d.averageDuration
    const maxStreak =
      acc.maxStreak && d.maxStreak ?
        Math.max(acc.maxStreak, d.maxStreak)
      : acc.maxStreak || d.maxStreak

    const result = {
      userId: d.userId,
      totalDuration,
      count,
      firstSessionDate,
      averageDuration,
      maxStreak,
      updatedAt: Date.now() as Millisecond
    }

    return result
}

export async function getStatsColSnapshot(
  firestoreDB: Firestore,
  userUid: string
) {
  const statsColRef = collection(firestoreDB, COLL_STATS)

  const statsQuery = query(statsColRef, where("userId", "==", userUid))
  const statsColSnapshot = await getDocs(statsQuery)
  return statsColSnapshot as QuerySnapshot<DbStatsData>
}

type StatsSnapshotDoc = QueryDocumentSnapshot<DbStatsData>
