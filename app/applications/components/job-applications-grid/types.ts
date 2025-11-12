import { Timestamp } from "firebase/firestore";

export type ApplicationStatus =
  | "Applied"
  | "Interview Scheduled"
  | "Interviewing"
  | "Offer"
  | "Rejected";

export interface CV {
  id: string;
  fileId: string;
  name: string;
  size: number;
  storagePath: string;
  uploadedAt: Timestamp;
}

export interface JobApplication {
  id: string;
  cvId: string;
  jobTitle: string;
  company: string;
  applicationLink: string;
  notes: string;
  status: ApplicationStatus;
  compatibilityScore: number;
  improvementTips: string;
  createdAt: Timestamp;
}

export interface AddApplicationInput {
  applicationLink: string;
}
