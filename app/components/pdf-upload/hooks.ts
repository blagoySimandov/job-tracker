"use client";

import { useState, useCallback } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase-config";
import { UploadedPdf, PdfUploadError } from "./types";
import {
  MAX_FILE_SIZE,
  ERROR_MESSAGES,
  JOB_APPLICATIONS_COLLECTION,
} from "./constants";

export const usePdfUpload = () => {
  const [uploadedPdf, setUploadedPdf] = useState<UploadedPdf | null>(null);
  const [error, setError] = useState<PdfUploadError | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File): PdfUploadError | null => {
    if (file.type !== "application/pdf") {
      return {
        message: ERROR_MESSAGES.INVALID_TYPE,
        type: "validation",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        message: ERROR_MESSAGES.FILE_TOO_LARGE,
        type: "validation",
      };
    }

    return null;
  };

  const handleFile = useCallback(async (file: File) => {
    setError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsUploading(true);

    try {
      const fileId = `${Date.now()}-${file.name}`;
      const storageRef = ref(
        storage,
        `${JOB_APPLICATIONS_COLLECTION}/${fileId}`,
      );

      const snapshot = await uploadBytes(storageRef, file);

      const uploadedAt = new Date();

      const docRef = await addDoc(collection(db, JOB_APPLICATIONS_COLLECTION), {
        fileId,
        name: file.name,
        size: file.size,
        uploadedAt: uploadedAt.toISOString(),
        storagePath: snapshot.ref.fullPath,
      });

      const uploadedFile: UploadedPdf = {
        file,
        id: docRef.id,
        name: file.name,
        size: file.size,
        uploadedAt,
      };

      setUploadedPdf(uploadedFile);
    } catch (err) {
      setError({
        message: ERROR_MESSAGES.UPLOAD_FAILED,
        type: "upload",
      });
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile],
  );

  const removeFile = useCallback(() => {
    setUploadedPdf(null);
    setError(null);
  }, []);

  return {
    uploadedPdf,
    error,
    isDragging,
    isUploading,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    removeFile,
  };
};
