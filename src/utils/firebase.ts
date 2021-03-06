import { initializeApp } from 'firebase/app';
import { firebaseAppConfig } from './firebaseAppConfig';
import { getFirestore } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = firebaseAppConfig;

// Initialize Firebase
const app: any = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;
