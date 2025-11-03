import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User } from '@/types/user';

function ensureFirebase() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase should only be used on the client side.');
  }

  // Try to initialize if not already done
  const { getAuthInstance, getDbInstance } = require('@/lib/firebase');
  const authInstance = getAuthInstance();
  const dbInstance = getDbInstance();

  if (!authInstance || !dbInstance) {
    throw new Error('Firebase is not initialized. Please check your .env.local file and restart the dev server.');
  }

  return { auth: authInstance, db: dbInstance };
}

const googleProvider = new GoogleAuthProvider();

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<FirebaseUser> {
  const { auth: authInstance, db: dbInstance } = ensureFirebase();
  const userCredential = await createUserWithEmailAndPassword(
    authInstance,
    email,
    password
  );
  const user = userCredential.user;

  // Create user profile in Firestore
  const userData: Omit<User, 'uid'> = {
    email,
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
    onboardingCompleted: false,
  };

  await setDoc(doc(dbInstance, 'users', user.uid), userData);

  return user;
}

export async function signIn(
  email: string,
  password: string
): Promise<FirebaseUser> {
  const { auth: authInstance } = ensureFirebase();
  const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
  return userCredential.user;
}

export async function signInWithGoogle(): Promise<FirebaseUser> {
  const { auth: authInstance, db: dbInstance } = ensureFirebase();
  const result = await signInWithPopup(authInstance, googleProvider);
  const user = result.user;

  // Check if user profile exists, create if new
  const userDoc = await getDoc(doc(dbInstance, 'users', user.uid));
  if (!userDoc.exists()) {
    const userData: Omit<User, 'uid'> = {
      email: user.email || '',
      name: user.displayName || 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      onboardingCompleted: false,
    };
    await setDoc(doc(dbInstance, 'users', user.uid), userData);
  }

  return user;
}

export async function signOut(): Promise<void> {
  const { auth: authInstance } = ensureFirebase();
  await firebaseSignOut(authInstance);
}

export async function getUserProfile(
  uid: string
): Promise<User | null> {
  try {
    const { db: dbInstance } = ensureFirebase();
    const userDoc = await getDoc(doc(dbInstance, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      // Handle Firestore timestamp conversion
      const dateOfBirth = data.dateOfBirth?.toDate 
        ? data.dateOfBirth.toDate() 
        : data.dateOfBirth;
      const createdAt = data.createdAt?.toDate 
        ? data.createdAt.toDate() 
        : data.createdAt;
      const updatedAt = data.updatedAt?.toDate 
        ? data.updatedAt.toDate() 
        : data.updatedAt;
      
      return { 
        uid, 
        ...data,
        dateOfBirth,
        createdAt,
        updatedAt,
      } as User;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}
