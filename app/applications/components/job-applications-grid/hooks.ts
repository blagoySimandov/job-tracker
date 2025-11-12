import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCV,
  fetchCVs,
  fetchJobApplications,
  addJobApplication,
  updateJobApplication,
} from "./services";
import { AddApplicationInput, ApplicationStatus, CV } from "./types";

const CVS_QUERY_KEY = ["cvs"];
const getApplicationsQueryKey = (cvId: string) => ["job-applications", cvId];

export const useCVs = () => {
  return useQuery({
    queryKey: CVS_QUERY_KEY,
    queryFn: fetchCVs,
  });
};

export const useCreateCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cvData: Omit<CV, "id">) => createCV(cvData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CVS_QUERY_KEY });
    },
  });
};

export const useJobApplications = (cvId: string) => {
  return useQuery({
    queryKey: getApplicationsQueryKey(cvId),
    queryFn: () => fetchJobApplications(cvId),
    enabled: !!cvId,
  });
};

export const useAddJobApplication = (cvId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddApplicationInput) => addJobApplication(cvId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getApplicationsQueryKey(cvId) });
    },
  });
};

export const useUpdateJobApplication = (cvId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: { status?: ApplicationStatus; notes?: string };
    }) => updateJobApplication(cvId, id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getApplicationsQueryKey(cvId) });
    },
  });
};
