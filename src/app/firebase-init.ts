import { createUserStats } from "features/home/create-user-stats"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeFirestore } from "firebase/firestore"

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey,
  authDomain: "skuka-18d4b.firebaseapp.com",
  projectId: "skuka-18d4b",
  storageBucket: "skuka-18d4b.firebasestorage.app",
  messagingSenderId: "379854098163",
  appId: "1:379854098163:web:cbb5c8adfdf440e511f186"
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firestore = initializeFirestore(firebaseApp, {
  localCache: {
    kind: "persistent"
  }
})

export const auth = getAuth(firebaseApp)
onAuthStateChanged(auth, createUserStats)

// onAuthStateChanged(auth, createUserStats)
