import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import 'firebase/database';
var firebaseConfig = {
    apiKey: "AIzaSyAjCfCdnCXF4_yXmFqTTPY0ey1rYpqd2B4",
    authDomain: "tripservice-f5d9d.firebaseapp.com",
    databaseURL: "https://tripservice-f5d9d-default-rtdb.firebaseio.com",
    projectId: "tripservice-f5d9d",
    storageBucket: "tripservice-f5d9d.appspot.com",
    messagingSenderId: "910763898116",
    appId: "1:910763898116:android:241a505c7dc05348a48c51"
  };
  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db }