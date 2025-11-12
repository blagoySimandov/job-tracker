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

export const STATUS_GRADIENT_BACKGROUNDS: Record<ApplicationStatus, string> = {
  Applied: "bg-gradient-to-br from-sky-light/20 to-sky-light/5",
  "Interview Scheduled": "bg-gradient-to-br from-butter/30 to-butter/5",
  Interviewing: "bg-gradient-to-br from-tangerine/20 to-tangerine/5",
  Offer: "bg-gradient-to-br from-green-500/20 to-green-500/5",
  Rejected: "bg-gradient-to-br from-coral/20 to-coral/5",
};

export const STATUS_BORDER_COLORS: Record<ApplicationStatus, string> = {
  Applied: "border-sky-light/40",
  "Interview Scheduled": "border-butter/50",
  Interviewing: "border-tangerine/40",
  Offer: "border-green-500/40",
  Rejected: "border-coral/40",
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
