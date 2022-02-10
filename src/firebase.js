import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDjrcd0FnKzhbpWlDw32ZU240QmAVG2Wlg",
  authDomain: "event-scheduler-f2afb.firebaseapp.com",
  databaseURL: "https://event-scheduler-f2afb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "event-scheduler-f2afb",
  storageBucket: "event-scheduler-f2afb.appspot.com",
  messagingSenderId: "252744892353",
  appId: "1:252744892353:web:bb5fbde3ab9bc03a1d3940"
  
})

export const auth = app.auth()
export const fireDB=app.database().ref();
export const firestore = firebase.firestore();
export default app
