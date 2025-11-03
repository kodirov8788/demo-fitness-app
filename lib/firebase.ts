import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Lazy initialization pattern - only initialize when needed
let app: FirebaseApp | undefined;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  };
}

function initializeFirebase() {
  // Only run on client
  if (typeof window === 'undefined') {
    return;
  }

  // Already initialized
  if (app) {
    return;
  }

  const firebaseConfig = getFirebaseConfig();

  try {
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
      console.warn('Firebase configuration is incomplete. Please check your .env.local file.');
      return;
    }

    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    // Initialize services
    authInstance = getAuth(app);
    dbInstance = getFirestore(app);
    storageInstance = getStorage(app);
  } catch (error: any) {
    console.error('Firebase initialization error:', error);
    // Don't throw - let components handle null values gracefully
  }
}

// Initialize lazily - only when module is imported on client
if (typeof window !== 'undefined') {
  // Use requestIdleCallback or setTimeout to defer initialization
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initializeFirebase());
  } else {
    setTimeout(() => initializeFirebase(), 0);
  }
}

// Export getters that initialize if needed
export function getAuthInstance(): Auth | null {
  if (typeof window !== 'undefined' && !authInstance) {
    initializeFirebase();
  }
  return authInstance;
}

export function getDbInstance(): Firestore | null {
  if (typeof window !== 'undefined' && !dbInstance) {
    initializeFirebase();
  }
  return dbInstance;
}

export function getStorageInstance(): FirebaseStorage | null {
  if (typeof window !== 'undefined' && !storageInstance) {
    initializeFirebase();
  }
  return storageInstance;
}

// Export direct references (will be null on server, initialized on client)
export const auth = typeof window !== 'undefined' ? getAuthInstance() : null;
export const db = typeof window !== 'undefined' ? getDbInstance() : null;
export const storage = typeof window !== 'undefined' ? getStorageInstance() : null;

export default app;
