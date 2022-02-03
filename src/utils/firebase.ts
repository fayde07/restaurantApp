import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import { doc, getDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyDg9intOFGHX851R78vhXqk3Akjndz8i1Q',
  authDomain: 'restaurantapp-47f5a.firebaseapp.com',
  projectId: 'restaurantapp-47f5a',
  storageBucket: 'restaurantapp-47f5a.appspot.com',
  messagingSenderId: '249892659350',
  appId: '1:249892659350:web:f51fc1ae42d88437a862b7',
};

// Initialize Firebase
const app: any = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const database = getDatabase(app);


export { auth, db, storage,  };
export default app;
