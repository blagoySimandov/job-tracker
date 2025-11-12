'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePdfUpload } from './hooks';

export const PdfUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    uploadedPdf,
    error,
    isDragging,
    isUploading,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    removeFile,
  } = usePdfUpload();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isUploading ? (
        <Card className="border-2 border-sky-light bg-sky-light/5">
          <CardContent className="flex flex-col items-center justify-center py-16 px-6">
            <div className="mb-4">
              <div className="w-16 h-16 border-4 border-sky-light border-t-transparent rounded-full animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Uploading PDF...
            </h3>
            <p className="text-gray-500 text-center">
              Please wait while your file is being uploaded
            </p>
          </CardContent>
        </Card>
      ) : !uploadedPdf ? (
        <Card
          className={`transition-all duration-200 cursor-pointer border-2 border-dashed ${
            isDragging
              ? 'border-sky-light bg-sky-light/10 scale-[1.02]'
              : 'border-gray-300 hover:border-tangerine hover:bg-tangerine/5'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <CardContent className="flex flex-col items-center justify-center py-16 px-6">
            <div className="mb-4">
              <svg
                className={`w-16 h-16 ${isDragging ? 'text-sky-light' : 'text-tangerine'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {isDragging ? 'Drop your PDF here' : 'Upload Job Application PDF'}
            </h3>

            <p className="text-gray-500 text-center mb-6">
              Drag and drop your PDF file here, or click to browse
            </p>

            <Button
              type="button"
              className="bg-tangerine hover:bg-tangerine/90 text-white"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Choose PDF File
            </Button>

            <p className="text-xs text-gray-400 mt-4">
              Maximum file size: 10MB
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-sky-light bg-sky-light/5">
          <CardContent className="py-8 px-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
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

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-gray-900 truncate">
                    {uploadedPdf.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatFileSize(uploadedPdf.size)} • Uploaded successfully
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {uploadedPdf.uploadedAt.toLocaleString()}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={removeFile}
                className="ml-4 border-coral text-coral hover:bg-coral hover:text-white"
              >
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-4 p-4 bg-coral/10 border border-coral rounded-lg">
          <p className="text-sm text-coral font-medium">{error.message}</p>
        </div>
      )}
    </div>
  );
};
