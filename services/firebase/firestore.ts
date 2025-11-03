import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getDbInstance } from '@/lib/firebase';

function ensureFirebase() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase should only be used on the client side.');
  }
  const dbInstance = getDbInstance();
  if (!dbInstance) {
    throw new Error('Firebase is not initialized. Please check your .env.local file and restart the dev server.');
  }
  return { db: dbInstance };
}

export async function getUserDocument(uid: string) {
  const { db } = ensureFirebase();
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data();
  }
  return null;
}

export async function updateUserDocument(uid: string, data: any) {
  const { db } = ensureFirebase();
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: new Date(),
  });
}

export async function createUserDocument(uid: string, data: any) {
  const { db } = ensureFirebase();
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
