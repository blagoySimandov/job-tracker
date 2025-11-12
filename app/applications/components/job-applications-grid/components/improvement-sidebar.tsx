"use client";

import { Button } from "@/components/ui/button";
import { MOCK_IMPROVEMENT_TIPS } from "../constants";

interface ImprovementSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

export const ImprovementSidebar = ({
  isOpen,
  onClose,
  jobTitle,
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

            <div className="space-y-4">
              {MOCK_IMPROVEMENT_TIPS.map((tip, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-neutral-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tangerine text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm text-neutral-700">{tip}</p>
                  </div>
                </div>
              ))}
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
