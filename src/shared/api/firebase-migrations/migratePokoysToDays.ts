import {
  collection,
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc
} from "@firebase/firestore"
import { firestore } from "features/home/firebase-init"
import {
  doc,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where
} from "firebase/firestore"
import { SkukaSession, PseudoServerDayData } from "shared/types"

// eslint-disable
const timestamp = Timestamp.fromDate(new Date(new Date().toDateString()))
const INIT_DAY_DATA: PseudoServerDayData = {
  // NOTE: hardcode!
  timestamp,
  count: 0,
  totalDuration: 0,
  sessions: [],
  userId: ""
}

// eslint-disable-next-line max-statements, complexity, max-statements
export const migrateSkukaToDay = async (
  skukaSnapshot: QueryDocumentSnapshot<DocumentData>,
  index: number,
  firestoreDB: Firestore
) => {
  const timeout = index * 1000

  setTimeout(
    // eslint-disable-next-line max-statements
    async () => {
      const sessionData = skukaSnapshot.data() as SkukaSession

      const userId: string =
        typeof sessionData.user === "string" ?
          (sessionData.user as string).replace("users/", "")
        : sessionData.user?.id || "user-id-not-found" // NOTE: check and replace hardcode

      const daysColRef = collection(firestoreDB, "days")
      const dayDateString = new Date(sessionData.timestamp).toDateString()
      const dayTimestamp = Timestamp.fromDate(new Date(dayDateString))
      const daysQuery = query(
        daysColRef,
        // NOTE: this filter is working
        where("userId", "==", userId),
        // NOTE: this filter is working
        where("timestamp", "==", dayTimestamp)
      )
      const daysQuerySnapshot = await getDocs(daysQuery)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (daysQuerySnapshot.docs.length > 0) {
        console.info("write day to EXISTED document")
        const dayDocRef = daysQuerySnapshot.docs[0].ref
        const daySnapshot = await getDoc(dayDocRef)
        const dayData = daySnapshot.data()

        const newDayData: PseudoServerDayData = {
          timestamp: dayTimestamp,
          count: dayData?.count + 1,
          totalDuration: dayData?.totalDuration + sessionData.duration,
          sessions: [...dayData?.sessions, sessionData],
          userId
        }

        await setDoc(dayDocRef, newDayData)
          .then(res => {
            console.info("success ", index)
          })
          .catch(e => console.error("⛔️", e))
        await deleteDoc(skukaSnapshot.ref)

        // NOTE: WRITE NEW DAY
      } else if (daysQuerySnapshot.docs.length === 0) {
        console.info("write day to NEW document")
        const newDayRef = doc(daysColRef)
        const dayData = INIT_DAY_DATA

        const newDayData: PseudoServerDayData = {
          timestamp: dayTimestamp,
          count: dayData.count + 1,
          totalDuration: dayData.totalDuration + sessionData.duration,
          sessions: [...dayData.sessions, sessionData],
          userId
        }

        await setDoc(newDayRef, newDayData)
          .then(() => {
            console.info("success ", index)
          })
          .catch(e => console.error("⛔️", e))
        await deleteDoc(skukaSnapshot.ref)
      }
    },
    timeout
  )

  // TODO: add deleteing of skukas when test function;
  // await deleteDoc(skukaSnapshot.ref);
}

export const migrateSkukasToDays = async () => {
  const skukasColRef = collection(firestore, "skukas")
  const q = query(skukasColRef, orderBy("timestamp", "desc"))
  const querySnapshot = await getDocs(q)
  console.info("осталось Покоев", querySnapshot.size)

  const skukasDocs = querySnapshot.docs.slice(0, 100)
  skukasDocs.forEach((snapshot, i) => {
    migrateSkukaToDay(snapshot, i, firestore)
  })
}
