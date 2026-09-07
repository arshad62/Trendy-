import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc,
  getDocFromServer,
  collection,
  setDoc,
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID (CRITICAL: Required for named firestore instance)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Initialize Firebase Storage with production bucket
export const storage = getStorage(
  app,
  firebaseConfig.storageBucket ? `gs://${firebaseConfig.storageBucket}` : undefined
);

// SKILL Mandate: Error handling types and function
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test as required by skill guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'inquiries', 'connection_probe'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is currently offline or unreachable.');
      return false;
    }
    // Permission denied or not found is expected for connection_probe and confirms network connectivity
    return true;
  }
}

export interface StorageUploadResult {
  url: string;
  fullPath: string;
  name: string;
  size: number;
  contentType?: string;
}

/**
 * Upload a file directly to Google Cloud Firebase Storage
 */
export async function uploadFileToFirebaseStorage(
  folderPath: string,
  file: File,
  onProgress?: (progressPercent: number) => void
): Promise<StorageUploadResult> {
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniquePath = `${folderPath}/${Date.now()}_${sanitizedName}`;
  const fileRef = storageRef(storage, uniquePath);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(fileRef, file, {
      contentType: file.type || 'application/octet-stream',
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      }
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        if (snapshot.totalBytes > 0 && onProgress) {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          onProgress(progress);
        }
      },
      (error) => {
        console.error('Firebase Storage upload error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            url: downloadUrl,
            fullPath: uniquePath,
            name: file.name,
            size: file.size,
            contentType: file.type,
          });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Persist uploaded team member photo metadata into Firestore
 */
export async function saveTeamMemberPhoto(memberId: string, photoUrl: string): Promise<boolean> {
  try {
    await setDoc(doc(db, 'team_photos', memberId), {
      memberId,
      photoUrl,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.warn('Could not persist team photo metadata to Firestore:', err);
    return false;
  }
}

/**
 * Fetch persisted team member photo from Firestore
 */
export async function getTeamMemberPhoto(memberId: string): Promise<string | null> {
  try {
    const snap = await getDoc(doc(db, 'team_photos', memberId));
    if (snap.exists()) {
      return snap.data()?.photoUrl || null;
    }
  } catch (err) {
    console.warn('Could not retrieve team photo from Firestore:', err);
  }
  return null;
}

export interface InquiryData {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
  message: string;
  source: 'quote_modal' | 'contact_section' | 'estimator';
  status?: 'new' | 'reviewed' | 'contacted' | 'quoted' | 'archived';
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt?: DocumentData;
}

export async function submitInquiry(data: Omit<InquiryData, 'id' | 'createdAt' | 'status'> & { status?: string }) {
  const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const path = `inquiries/${inquiryId}`;

  const payload: Record<string, any> = {
    fullName: data.fullName.trim().slice(0, 100),
    email: data.email.trim().slice(0, 150),
    message: data.message.trim().slice(0, 2000),
    source: data.source,
    status: data.status || 'new',
    createdAt: serverTimestamp(),
  };

  if (data.phone?.trim()) payload.phone = data.phone.trim().slice(0, 50);
  if (data.projectType?.trim()) payload.projectType = data.projectType.trim().slice(0, 100);
  if (data.budget?.trim()) payload.budget = data.budget.trim().slice(0, 100);
  if (data.timeline?.trim()) payload.timeline = data.timeline.trim().slice(0, 100);
  if (data.location?.trim()) payload.location = data.location.trim().slice(0, 200);
  if (data.attachmentUrl?.trim()) payload.attachmentUrl = data.attachmentUrl.trim().slice(0, 1000);
  if (data.attachmentName?.trim()) payload.attachmentName = data.attachmentName.trim().slice(0, 250);

  try {
    await setDoc(doc(db, 'inquiries', inquiryId), payload);
    return { success: true, id: inquiryId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export interface EstimateRecord {
  projectCategory: string;
  projectSubtype?: string;
  floorArea: number;
  qualityTier: string;
  estimatedMin: number;
  estimatedMax: number;
  clientName?: string;
  clientEmail?: string;
}

export async function saveCostEstimate(estimate: EstimateRecord) {
  const estimateId = `est_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const path = `estimates/${estimateId}`;

  const payload: Record<string, any> = {
    projectCategory: estimate.projectCategory.slice(0, 100),
    floorArea: Number(estimate.floorArea),
    qualityTier: estimate.qualityTier.slice(0, 50),
    estimatedMin: Math.round(Number(estimate.estimatedMin)),
    estimatedMax: Math.round(Number(estimate.estimatedMax)),
    createdAt: serverTimestamp(),
  };

  if (estimate.projectSubtype?.trim()) payload.projectSubtype = estimate.projectSubtype.trim().slice(0, 100);
  if (estimate.clientName?.trim()) payload.clientName = estimate.clientName.trim().slice(0, 100);
  if (estimate.clientEmail?.trim()) payload.clientEmail = estimate.clientEmail.trim().slice(0, 150);

  try {
    await setDoc(doc(db, 'estimates', estimateId), payload);
    return { success: true, id: estimateId };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
