"use client";

import { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button } from "@/components/ui/button";

ModuleRegistry.registerModules([AllCommunityModule]);
import {
  useJobApplications,
  useAddJobApplication,
  useUpdateJobApplication,
} from "./hooks";
import { JobApplication, ApplicationStatus } from "./types";
import {
  CvCellRenderer,
  StatusCellRenderer,
  NotesCellEditor,
  AddApplicationModal,
  ImprovementSidebar,
} from "./components";

export const JobApplicationsGrid = () => {
  const { data: applications = [], isLoading } = useJobApplications();
  const addMutation = useAddJobApplication();
  const updateMutation = useUpdateJobApplication();
  const [sidebarState, setSidebarState] = useState<{
    isOpen: boolean;
    jobTitle?: string;
  }>({ isOpen: false });

  const handleAddApplication = useCallback(
    (link: string) => {
      addMutation.mutate({ applicationLink: link });
    },
    [addMutation]
  );

  const handleStatusChange = useCallback(
    (id: string, status: ApplicationStatus) => {
      updateMutation.mutate({ id, updates: { status } });
    },
    [updateMutation]
  );

  const handleNotesChange = useCallback(
    (id: string, notes: string) => {
      updateMutation.mutate({ id, updates: { notes } });
    },
    [updateMutation]
  );

  const handleShowImprovements = useCallback((jobTitle: string) => {
    setSidebarState({ isOpen: true, jobTitle });
  }, []);

  const columnDefs = useMemo<ColDef<JobApplication>[]>(
    () => [
      {
        headerName: "CV",
        field: "cvFileName",
        width: 120,
        cellRenderer: CvCellRenderer,
      },
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
            onClick={() => handleShowImprovements(params.data?.jobTitle)}
          >
            What to Improve
          </Button>
        ),
      },
    ],
    [handleNotesChange, handleShowImprovements]
  );

  const context = useMemo(
    () => ({
      onStatusChange: handleStatusChange,
    }),
    [handleStatusChange]
  );

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Job Applications</h1>
          <AddApplicationModal
            onAdd={handleAddApplication}
            isLoading={addMutation.isPending}
          />
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="ag-theme-quartz h-full">
          <AgGridReact
            rowData={applications}
            columnDefs={columnDefs}
            context={context}
            loading={isLoading}
            domLayout="normal"
            defaultColDef={{
              resizable: true,
            }}
          />
        </div>
      </div>

      <ImprovementSidebar
        isOpen={sidebarState.isOpen}
        onClose={() => setSidebarState({ isOpen: false })}
        jobTitle={sidebarState.jobTitle}
      />
    </div>
  );
};
