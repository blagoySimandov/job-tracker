export interface UploadedPdf {
  file: File;
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
}

export interface PdfUploadError {
  message: string;
  type: 'validation' | 'upload';
}
