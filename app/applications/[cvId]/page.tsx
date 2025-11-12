import { JobApplicationsGrid } from "../components/job-applications-grid";

interface PageProps {
  params: Promise<{
    cvId: string;
  }>;
}

export default async function ApplicationsPage({ params }: PageProps) {
  const { cvId } = await params;
  return <JobApplicationsGrid cvId={cvId} />;
}
