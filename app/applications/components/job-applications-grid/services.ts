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
  JOB_APPLICATIONS_COLLECTION,
  MOCK_JOB_TITLES,
  MOCK_COMPANIES,
  MOCK_COMPATIBILITY_SCORES,
} from "./constants";
import { JobApplication, AddApplicationInput } from "./types";

const getRandomMockData = () => {
  const randomIndex = Math.floor(Math.random() * MOCK_JOB_TITLES.length);
  return {
    jobTitle: MOCK_JOB_TITLES[randomIndex],
    company: MOCK_COMPANIES[randomIndex],
    compatibilityScore: MOCK_COMPATIBILITY_SCORES[randomIndex],
  };
};

export const fetchJobApplications = async (): Promise<JobApplication[]> => {
  const q = query(
    collection(db, JOB_APPLICATIONS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as JobApplication[];
};

export const addJobApplication = async (
  input: AddApplicationInput
): Promise<JobApplication> => {
  const mockData = getRandomMockData();

  const newApplication = {
    applicationLink: input.applicationLink,
    jobTitle: mockData.jobTitle,
    company: mockData.company,
    compatibilityScore: mockData.compatibilityScore,
    cvUrl: "",
    cvFileName: "resume.pdf",
    notes: "",
    status: "Applied" as const,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(
    collection(db, JOB_APPLICATIONS_COLLECTION),
    newApplication
  );

  return {
    id: docRef.id,
    ...newApplication,
  };
};

export const updateJobApplication = async (
  id: string,
  updates: Partial<Omit<JobApplication, "id">>
): Promise<void> => {
  const docRef = doc(db, JOB_APPLICATIONS_COLLECTION, id);
  await updateDoc(docRef, updates);
};
