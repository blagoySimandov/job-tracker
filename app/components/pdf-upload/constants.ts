export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
};
export const JOB_APPLICATIONS_COLLECTION = "job-applications";

export const ERROR_MESSAGES = {
  INVALID_TYPE: "Please upload a PDF file only.",
  FILE_TOO_LARGE: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
  UPLOAD_FAILED: "Failed to upload file. Please try again.",
} as const;

export const SUCCESS_MESSAGES = {
  UPLOAD_SUCCESS: "PDF uploaded successfully!",
} as const;
