"use client";

import { Card, CardContent } from "@/components/ui/card";
import { JobApplication } from "../types";

interface StatsHeaderProps {
  applications: JobApplication[];
}

export const StatsHeader = ({ applications }: StatsHeaderProps) => {
  const totalApplications = applications.length;

  const interviewsScheduled = applications.filter(
    (app) => app.status === "Interview Scheduled" || app.status === "Interviewing"
  ).length;

  const offersReceived = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const successRate = totalApplications > 0
    ? Math.round((offersReceived / totalApplications) * 100)
    : 0;

  const stats = [
    {
      label: "Total Applications",
      value: totalApplications,
      gradient: "from-sky-light/30 to-sky-light/10",
      border: "border-sky-light/40",
    },
    {
      label: "Interviews",
      value: interviewsScheduled,
      gradient: "from-tangerine/30 to-tangerine/10",
      border: "border-tangerine/40",
    },
    {
      label: "Offers",
      value: offersReceived,
      gradient: "from-green-500/30 to-green-500/10",
      border: "border-green-500/40",
    },
    {
      label: "Success Rate",
      value: `${successRate}%`,
      gradient: "from-butter/40 to-butter/10",
      border: "border-butter/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className={`border-2 ${stat.border} bg-gradient-to-br ${stat.gradient} transition-all hover:shadow-lg`}
        >
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-600">
                {stat.label}
              </p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
