"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { migrateData } from "@/lib/migrate-data";

export default function MigratePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleMigrate = async () => {
    setIsRunning(true);
    setResult(null);

    const migrationResult = await migrateData();
    setResult(migrationResult);
    setIsRunning(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
      <Card className="max-w-2xl w-full">
        <CardContent className="py-12 px-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Data Migration
          </h1>
          <p className="text-neutral-600 mb-6">
            This will migrate your existing data to the new structure:
          </p>
          <ul className="list-disc list-inside text-neutral-600 mb-8 space-y-2">
            <li>Move CV documents from job-applications to cvs collection</li>
            <li>Delete mock application data</li>
            <li>Set up proper collection structure for future applications</li>
          </ul>

          {result && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`font-medium ${
                  result.success ? "text-green-900" : "text-red-900"
                }`}
              >
                {result.message}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={handleMigrate}
              disabled={isRunning}
              className="bg-tangerine hover:bg-tangerine/90 text-white"
            >
              {isRunning ? "Migrating..." : "Run Migration"}
            </Button>

            {result?.success && (
              <Button
                asChild
                variant="outline"
                className="border-sky-light text-sky-light hover:bg-sky-light hover:text-white"
              >
                <a href="/applications">View Applications</a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
