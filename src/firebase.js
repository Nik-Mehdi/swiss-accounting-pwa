import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 👇 کدهای فایربیسِ پروژه خودت رو دقیقاً اینجا جایگزین کن 👇
const firebaseConfig = { 
  apiKey : "AIzaSyAF1-A9gpU0doM-Wv1aDgsurHa7FQscl2I" , 
  authDomain : "swiss-ledgr-app.firebaseapp.com" , 
  projectId : "swiss-ledgr-app" , 
  storageBucket : "swiss-ledgr-app.firebasestorage.app" , 
  messagingSenderId : "319228585116" , 
  appId : "1:319228585116:web:280e927a30b153ef417959" 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);