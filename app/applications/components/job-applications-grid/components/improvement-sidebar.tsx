"use client";

import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

interface ImprovementSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  improvementTips?: string;
}

export const ImprovementSidebar = ({
  isOpen,
  onClose,
  jobTitle,
  improvementTips,
}: ImprovementSidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 z-50 h-full w-96 bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">What to Improve</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {jobTitle && (
              <p className="mb-4 text-sm text-neutral-600">
                Suggestions for: <span className="font-medium">{jobTitle}</span>
              </p>
            )}

            <div className="prose prose-sm max-w-none">
              {improvementTips ? (
                <ReactMarkdown>{improvementTips}</ReactMarkdown>
              ) : (
                <p className="text-neutral-500 italic">
                  No improvement tips available for this application.
                </p>
              )}
            </div>
          </div>

          <div className="border-t p-4">
            <p className="text-xs text-neutral-500">
              These are AI-generated suggestions based on the job description
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
