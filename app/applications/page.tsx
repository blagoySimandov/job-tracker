"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCVs } from "./components/job-applications-grid/hooks";

export default function ApplicationsPage() {
  const { data: cvs = [], isLoading } = useCVs();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-16 h-16 border-4 border-sky-light border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (cvs.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <Card className="max-w-md">
          <CardContent className="py-12 px-6 text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              No CVs Found
            </h2>
            <p className="text-neutral-600 mb-6">
              Upload a CV to start tracking your job applications
            </p>
            <Button asChild className="bg-tangerine hover:bg-tangerine/90">
              <Link href="/">Upload CV</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Your CVs
          </h1>
          <p className="text-neutral-600">
            Select a CV to view and manage job applications
          </p>
        </div>

        <div className="grid gap-4">
          {cvs.map((cv) => (
            <Link key={cv.id} href={`/applications/${cv.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-sky-light">
                <CardContent className="py-6 px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-coral/10 rounded-lg">
                        <svg
                          className="w-8 h-8 text-coral"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900">
                          {cv.name}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Uploaded {cv.uploadedAt.toDate().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-sky-light text-sky-light hover:bg-sky-light hover:text-white">
                      View Applications →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Button asChild variant="outline" className="w-full">
            <Link href="/">+ Upload Another CV</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
