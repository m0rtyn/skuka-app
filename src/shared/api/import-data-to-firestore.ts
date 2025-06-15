import { formatISO, parse } from "date-fns"
import { doc, Firestore, setDoc } from "firebase/firestore"
import { v4 } from "uuid"

// NOTE: This is a temporary solution to migrate data from local data to Firestore.
export const importDataToFirestore = async (firestore: Firestore) => {
  const data = [{ timestamp: "", duration: 0 }]

  data.forEach(async record => {
    try {
      const timestamp = formatISO(parse(record.timestamp, "dd/MM", new Date()))
      const skukaId = v4()
      const skukaDoc = doc(firestore, "skukas", skukaId)

      await setDoc(skukaDoc, {
        user: "/users/rnuYUc9vigMVMkYqs70cSDBTgSm2",
        duration: record.duration,
        timestamp
      })
    } catch (e) {
      console.error(e, record)
    }
  })
}
