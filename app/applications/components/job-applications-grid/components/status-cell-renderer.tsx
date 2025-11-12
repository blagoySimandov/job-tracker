"use client";

import { CustomCellRendererProps } from "ag-grid-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { JobApplication, ApplicationStatus } from "../types";
import { STATUS_OPTIONS, STATUS_COLORS } from "../constants";

export const StatusCellRenderer = (
  props: CustomCellRendererProps<JobApplication>
) => {
  const { status } = props.data || {};
  const { onStatusChange } = props.context;

  const handleChange = (newStatus: ApplicationStatus) => {
    if (props.data?.id) {
      onStatusChange(props.data.id, newStatus);
    }
  };

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "h-7 w-auto min-w-[140px] rounded-full border-0 text-xs font-medium",
          STATUS_COLORS[status as ApplicationStatus]
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                STATUS_COLORS[option]
              )}
            >
              {option}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
