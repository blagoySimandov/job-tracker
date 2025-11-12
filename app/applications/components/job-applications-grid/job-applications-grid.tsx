"use client";

import { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry, RowClassParams } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./styles.css";
import { Button } from "@/components/ui/button";

ModuleRegistry.registerModules([AllCommunityModule]);
import {
  useJobApplications,
  useAddJobApplication,
  useUpdateJobApplication,
} from "./hooks";
import { JobApplication, ApplicationStatus } from "./types";
import {
  StatusCellRenderer,
  NotesCellEditor,
  AddApplicationModal,
  ImprovementSidebar,
  StatsHeader,
  FilterBar,
  FilterState,
} from "./components";

interface JobApplicationsGridProps {
  cvId: string;
}

export const JobApplicationsGrid = ({ cvId }: JobApplicationsGridProps) => {
  const { data: applications = [], isLoading } = useJobApplications(cvId);
  const addMutation = useAddJobApplication(cvId);
  const updateMutation = useUpdateJobApplication(cvId);
  const [sidebarState, setSidebarState] = useState<{
    isOpen: boolean;
    jobTitle?: string;
    improvementTips?: string;
  }>({ isOpen: false });
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    companySearch: "",
  });

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const statusMatch =
        filters.status === "all" || app.status === filters.status;
      const companyMatch =
        !filters.companySearch ||
        app.company.toLowerCase().includes(filters.companySearch.toLowerCase());
      return statusMatch && companyMatch;
    });
  }, [applications, filters]);

  const handleAddApplication = useCallback(
    (link: string) => {
      addMutation.mutate({ applicationLink: link });
    },
    [addMutation],
  );

  const handleStatusChange = useCallback(
    (id: string, status: ApplicationStatus) => {
      updateMutation.mutate({ id, updates: { status } });
    },
    [updateMutation],
  );

  const handleNotesChange = useCallback(
    (id: string, notes: string) => {
      updateMutation.mutate({ id, updates: { notes } });
    },
    [updateMutation],
  );

  const handleShowImprovements = useCallback(
    (jobTitle: string, improvementTips: string) => {
      setSidebarState({ isOpen: true, jobTitle, improvementTips });
    },
    [],
  );

  const columnDefs = useMemo<ColDef<JobApplication>[]>(
    () => [
      {
        headerName: "Job Title",
        field: "jobTitle",
        width: 200,
        sortable: true,
      },
      {
        headerName: "Company",
        field: "company",
        width: 180,
        sortable: true,
      },
      {
        headerName: "Application Link",
        field: "applicationLink",
        width: 150,
        cellRenderer: (params: any) => (
          <a
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View
          </a>
        ),
      },
      {
        headerName: "Status",
        field: "status",
        width: 180,
        cellRenderer: StatusCellRenderer,
      },
      {
        headerName: "Notes",
        field: "notes",
        flex: 1,
        editable: true,
        cellEditor: NotesCellEditor,
        onCellValueChanged: (params) => {
          if (params.data?.id) {
            handleNotesChange(params.data.id, params.newValue);
          }
        },
      },
      {
        headerName: "Compatibility",
        field: "compatibilityScore",
        width: 130,
        cellRenderer: (params: any) => (
          <div className="flex h-full items-center">
            <span className="font-medium">{params.value}%</span>
          </div>
        ),
      },
      {
        headerName: "",
        field: "actions",
        width: 150,
        cellRenderer: (params: any) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleShowImprovements(
                params.data?.jobTitle,
                params.data?.improvementTips,
              )
            }
          >
            What to Improve
          </Button>
        ),
      },
    ],
    [handleNotesChange, handleShowImprovements],
  );

  const context = useMemo(
    () => ({
      onStatusChange: handleStatusChange,
    }),
    [handleStatusChange],
  );

  const getRowClass = useCallback((params: RowClassParams<JobApplication>) => {
    return params.data?.status || "";
  }, []);

  return (
    <div className="flex h-screen flex-col bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Job Applications
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              Track and manage your job applications
            </p>
          </div>
          <AddApplicationModal
            onAdd={handleAddApplication}
            isLoading={addMutation.isPending}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-[1600px] space-y-6">
          <StatsHeader applications={applications} />

          <FilterBar onFilterChange={setFilters} />

          <div className="ag-theme-quartz h-[600px] rounded-lg shadow-sm">
            <AgGridReact
              rowData={filteredApplications}
              columnDefs={columnDefs}
              context={context}
              loading={isLoading}
              domLayout="normal"
              defaultColDef={{
                resizable: true,
              }}
              getRowClass={getRowClass}
              rowClass="ag-row-custom"
              theme="legacy"
            />
          </div>
        </div>
      </div>

      <ImprovementSidebar
        isOpen={sidebarState.isOpen}
        onClose={() => setSidebarState({ isOpen: false })}
        jobTitle={sidebarState.jobTitle}
        improvementTips={sidebarState.improvementTips}
      />
    </div>
  );
};
