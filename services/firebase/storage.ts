import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getStorageInstance } from '@/lib/firebase';

function ensureStorage() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Storage should only be used on the client side.');
  }
  const storageInstance = getStorageInstance();
  if (!storageInstance) {
    throw new Error('Firebase Storage is not initialized.');
  }
  return storageInstance;
}

export async function uploadImage(
  path: string,
  file: File
): Promise<string> {
  const storage = ensureStorage();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function deleteImage(path: string): Promise<void> {
  const storage = ensureStorage();
  const imageRef = ref(storage, path);
  await deleteObject(imageRef);
}
