import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
  where
} from "firebase/firestore"
import { Minute, SkukaSession, ServerDayData } from "shared/types"
import { roundToHundredth } from "shared/utils/round-to-nth"

/* eslint-disable-next-line max-statements */
export const sendSessionToServer = async (
  firestoreDB: Firestore,
  sessionData: SkukaSession
) => {
  console.log(
    "🚀 ~ file: write-session-to-server.ts ~ var: sessionData",
    sessionData
  )
  const userId = sessionData.userId
  const daysColRef = collection(firestoreDB, "days")
  const dayTimestamp = Timestamp.fromMillis(
    // WARN: possible bug with forgetting timezone
    new Date(sessionData.timestamp).setHours(0, 0, 0, 0)
  )

  const daysQuery = query(
    daysColRef,
    where("userId", "==", userId),
    where("timestamp", "==", dayTimestamp)
  )

  try {
    const daysQuerySnapshot = await getDocs(daysQuery)

    if (daysQuerySnapshot.empty) {
      return await createNewDay(
        daysColRef,
        dayTimestamp,
        sessionData,
        userId,
        firestoreDB
      )
    } else {
      return await updateExistingDay(daysQuerySnapshot, sessionData)
    }
  } catch (e) {
    console.error("⛔️", e)
  }
}

// TODO: refactor this function
/* eslint-disable-next-line max-statements */
const createNewDay = async (
  daysColRef: CollectionReference<DocumentData>,
  dayTimestamp: Timestamp,
  sessionData: SkukaSession,
  userId: string,
  firestoreDB: Firestore
  // eslint-disable-next-line max-params
) => {
  const newDayRef = doc(daysColRef)

  const statsQuery = query(
    collection(firestoreDB, "stats"),
    where("userId", "==", userId),
    limit(1)
  )
  const userStatsQuerySnapshot = await getDocs(statsQuery)

  if (userStatsQuerySnapshot.empty) {
    console.error("User stats not found")
    return
  }
  const userStatsRef = userStatsQuerySnapshot.docs[0].ref

  const newDayData: ServerDayData = {
    totalDuration: roundToHundredth(sessionData.duration),
    sessions: [sessionData],
    timestamp: dayTimestamp,
    statsRef: userStatsRef,
    userId,
    count: 1
  }

  await setDay(newDayRef, newDayData)
  return newDayData
}

/* eslint-disable-next-line max-statements */
const updateExistingDay = async (
  daysQuerySnapshot: QuerySnapshot<DocumentData>,
  sessionData: SkukaSession
) => {
  // TODO: replace hardcode by dynamic code
  const dayDocRef = daysQuerySnapshot.docs[0].ref
  const daySnapshot = await getDoc(dayDocRef)
  const dayData = daySnapshot.data() as ServerDayData

  const totalDuration = dayData?.totalDuration ?? 0
  const sessions = dayData?.sessions ?? []

  const newDayData: ServerDayData = {
    ...dayData,
    count: dayData?.count + 1,
    totalDuration: roundToHundredth(
      totalDuration + sessionData.duration
    ) as Minute,
    sessions: [...sessions, sessionData]
  }

  await setDay(dayDocRef, newDayData)
  return newDayData
}

const setDay = async (
  dayRef: DocumentReference<DocumentData>,
  newDayData: ServerDayData
) => {
  try {
    await setDoc(dayRef, newDayData)
  } catch (e) {
    console.error("⛔️", e)
  }
}
