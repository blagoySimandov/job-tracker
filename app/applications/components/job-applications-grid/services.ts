import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import {
  CVS_COLLECTION,
  APPLICATIONS_SUBCOLLECTION,
  MOCK_JOB_TITLES,
  MOCK_COMPANIES,
  MOCK_COMPATIBILITY_SCORES,
} from "./constants";
import { CV, JobApplication, AddApplicationInput } from "./types";

const getRandomMockData = () => {
  const randomIndex = Math.floor(Math.random() * MOCK_JOB_TITLES.length);
  return {
    jobTitle: MOCK_JOB_TITLES[randomIndex],
    company: MOCK_COMPANIES[randomIndex],
    compatibilityScore: MOCK_COMPATIBILITY_SCORES[randomIndex],
  };
};

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
  const mockData = getRandomMockData();

  const newApplication = {
    applicationLink: input.applicationLink,
    jobTitle: mockData.jobTitle,
    company: mockData.company,
    compatibilityScore: mockData.compatibilityScore,
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
