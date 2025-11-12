import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import {
  CVS_COLLECTION,
  APPLICATIONS_SUBCOLLECTION,
} from "./constants";
import { CV, JobApplication, AddApplicationInput } from "./types";
import { analyzeJobApplication } from "@/app/actions/analyze-job";

export const createCV = async (cvData: Omit<CV, "id">): Promise<CV> => {
  const docRef = await addDoc(collection(db, CVS_COLLECTION), cvData);
  return {
    id: docRef.id,
    ...cvData,
  };
};

export const fetchCVs = async (): Promise<CV[]> => {
  const q = query(collection(db, CVS_COLLECTION), orderBy("uploadedAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CV[];
};

export const fetchJobApplications = async (
  cvId: string
): Promise<JobApplication[]> => {
  const q = query(
    collection(db, CVS_COLLECTION, cvId, APPLICATIONS_SUBCOLLECTION),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    cvId,
    ...doc.data(),
  })) as JobApplication[];
};

export const addJobApplication = async (
  cvId: string,
  input: AddApplicationInput
): Promise<JobApplication> => {
  const cvDocRef = doc(db, CVS_COLLECTION, cvId);
  const cvDoc = await getDoc(cvDocRef);

  if (!cvDoc.exists()) {
    throw new Error("CV not found");
  }

  const cvData = cvDoc.data() as CV;

  const analysis = await analyzeJobApplication(
    cvData.storagePath,
    input.applicationLink
  );

  const newApplication = {
    applicationLink: input.applicationLink,
    jobTitle: analysis.jobTitle,
    company: analysis.company,
    compatibilityScore: analysis.compatibilityScore,
    improvementTips: analysis.improvementTips,
    notes: "",
    status: "Applied" as const,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(
    collection(db, CVS_COLLECTION, cvId, APPLICATIONS_SUBCOLLECTION),
    newApplication
  );

  return {
    id: docRef.id,
    cvId,
    ...newApplication,
  };
};

export const updateJobApplication = async (
  cvId: string,
  id: string,
  updates: Partial<Omit<JobApplication, "id" | "cvId">>
): Promise<void> => {
  const docRef = doc(db, CVS_COLLECTION, cvId, APPLICATIONS_SUBCOLLECTION, id);
  await updateDoc(docRef, updates);
};
