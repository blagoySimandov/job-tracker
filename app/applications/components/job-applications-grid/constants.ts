import { ApplicationStatus } from "./types";

export const STATUS_OPTIONS: ApplicationStatus[] = [
  "Applied",
  "Interview Scheduled",
  "Interviewing",
  "Offer",
  "Rejected",
];

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Applied: "bg-sky-light text-black",
  "Interview Scheduled": "bg-butter text-black",
  Interviewing: "bg-tangerine text-white",
  Offer: "bg-green-500 text-white",
  Rejected: "bg-coral text-white",
};

export const MOCK_JOB_TITLES = [
  "Senior Frontend Engineer",
  "Full Stack Developer",
  "React Developer",
  "Software Engineer",
  "Frontend Developer",
];

export const MOCK_COMPANIES = [
  "TechCorp",
  "Innovation Labs",
  "Digital Solutions",
  "StartupHub",
  "Enterprise Systems",
];

export const MOCK_COMPATIBILITY_SCORES = [75, 82, 68, 91, 78];

export const MOCK_IMPROVEMENT_TIPS = [
  "Add more specific examples of React projects in your experience section",
  "Highlight your experience with TypeScript and modern tooling",
  "Include metrics and quantifiable achievements in previous roles",
  "Emphasize your collaboration and team leadership skills",
  "Add certifications or courses relevant to the position",
];

export const JOB_APPLICATIONS_COLLECTION = "job-applications";
