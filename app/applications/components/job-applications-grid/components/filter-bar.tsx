"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_OPTIONS } from "../constants";
import { ApplicationStatus } from "../types";

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  status: ApplicationStatus | "all";
  companySearch: string;
}

export const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    companySearch: "",
  });

  const handleStatusChange = (value: string) => {
    const newFilters = {
      ...filters,
      status: value as ApplicationStatus | "all",
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCompanySearchChange = (value: string) => {
    const newFilters = { ...filters, companySearch: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = { status: "all" as const, companySearch: "" };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.status !== "all" || filters.companySearch !== "";

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-neutral-700">Status:</label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-neutral-700">Company:</label>
          <input
            type="text"
            value={filters.companySearch}
            onChange={(e) => handleCompanySearchChange(e.target.value)}
            placeholder="Search companies..."
            className="h-9 w-[200px] rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-sm transition-colors focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="self-start sm:self-auto"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};
