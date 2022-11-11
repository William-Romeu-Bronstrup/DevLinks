import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-TjV5-q0NYeN-rnvzkc9d0SCr4Ff9hIU",
  authDomain: "devlinktree.firebaseapp.com",
  projectId: "devlinktree",
  storageBucket: "devlinktree.appspot.com",
  messagingSenderId: "75488680245",
  appId: "1:75488680245:web:a9d3394bdbf3e7953ad47c"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
