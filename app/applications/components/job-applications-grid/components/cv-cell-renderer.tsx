"use client";

import { CustomCellRendererProps } from "ag-grid-react";
import { Button } from "@/components/ui/button";
import { JobApplication } from "../types";

export const CvCellRenderer = (props: CustomCellRendererProps<JobApplication>) => {
  const { cvUrl, cvFileName } = props.data || {};

  if (!cvUrl) {
    return <span className="text-neutral-400">No CV</span>;
  }

  const handleClick = () => {
    window.open(cvUrl, "_blank");
  };

  return (
    <Button variant="link" onClick={handleClick} className="h-auto p-0 text-sm">
      {cvFileName || "View CV"}
    </Button>
  );
};
