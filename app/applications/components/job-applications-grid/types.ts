import { Timestamp } from "firebase/firestore";

export type ApplicationStatus =
  | "Applied"
  | "Interview Scheduled"
  | "Interviewing"
  | "Offer"
  | "Rejected";

export interface JobApplication {
  id: string;
  cvUrl: string;
  cvFileName: string;
  jobTitle: string;
  company: string;
  applicationLink: string;
  notes: string;
  status: ApplicationStatus;
  compatibilityScore: number;
  createdAt: Timestamp;
}

export interface AddApplicationInput {
  applicationLink: string;
}
