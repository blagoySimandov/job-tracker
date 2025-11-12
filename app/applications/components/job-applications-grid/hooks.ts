import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobApplications,
  addJobApplication,
  updateJobApplication,
} from "./services";
import { AddApplicationInput, ApplicationStatus } from "./types";

const QUERY_KEY = ["job-applications"];

export const useJobApplications = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchJobApplications,
  });
};

export const useAddJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AddApplicationInput) => addJobApplication(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};

export const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: { status?: ApplicationStatus; notes?: string };
    }) => updateJobApplication(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
};
