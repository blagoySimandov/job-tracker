import { PdfUpload } from './components/pdf-upload';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-light/20 via-butter/10 to-tangerine/20">
      <main className="w-full max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Job Application Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Upload your job application PDF to get started
          </p>
        </div>

        <PdfUpload />
      </main>
    </div>
  );
}
