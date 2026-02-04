'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { cn } from './lib/utils';

interface FileWithPreview extends File {
  preview?: string;
  progress?: number;
}

interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  onFilesChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  className?: string;
}

export function FileUpload({
  accept = 'image/*,.pdf,.doc,.docx,.txt',
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  multiple = true,
  onFilesChange,
  onUpload,
  className,
}: FileUploadProps): React.ReactElement {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const validateFile = useCallback((file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File ${file.name} exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
    }
    return null;
  }, [maxSize]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: FileWithPreview[] = [];
    
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        setError(error);
        return;
      }
      
      if (files.length + validFiles.length >= maxFiles) {
        setError(`Maximum ${maxFiles} files allowed`);
        break;
      }

      const fileWithPreview = file as FileWithPreview;
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      }
      fileWithPreview.progress = 0;
      validFiles.push(fileWithPreview);
    }

    if (validFiles.length > 0) {
      const newFilesList = [...files, ...validFiles];
      setFiles(newFilesList);
      setError('');
      onFilesChange?.(newFilesList);
    }
  }, [files, maxFiles, validateFile, onFilesChange]);

  const removeFile = useCallback((index: number) => {
    const file = files[index];
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  }, [files, onFilesChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      addFiles(files);
    }
  }, [addFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      addFiles(files);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [addFiles]);

  const handleUpload = async () => {
    if (!onUpload || files.length === 0) return;

    setUploading(true);
    try {
      await onUpload(files);
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const clearAll = useCallback(() => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setFiles([]);
    setError('');
    onFilesChange?.([]);
  }, [files, onFilesChange]);

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "flex flex-col items-center justify-center p-8 bg-surface-raised border-2 border-dashed rounded-xl transition-all cursor-pointer",
          isDragging && "border-primary bg-primary/10 scale-[1.02]",
          error && "border-red-600 bg-red-600/5",
          !isDragging && !error && "border-default hover:border-primary hover:bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          aria-label="File upload input"
        />

        <svg
          className={cn(
            "w-12 h-12 mb-4 transition-colors",
            isDragging ? "text-primary" : "text-muted"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <p className="text-default font-medium mb-1">
          {isDragging ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-sm text-muted mb-4">or click to browse</p>

        <div className="flex flex-wrap gap-2 justify-center">
          {['PDF', 'Images', 'Documents'].map((type) => (
            <span
              key={type}
              className="inline-flex items-center px-2 py-1 bg-surface-sunken rounded text-xs text-muted"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, index) => (
            <FileChip
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={clearAll}
              className="px-4 py-2 text-sm text-muted hover:text-default border border-default rounded-lg hover:bg-surface-sunken transition-colors"
              type="button"
            >
              Clear All
            </button>
            {onUpload && (
              <button
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
                className="flex-1 px-4 py-2 bg-primary text-inverted rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                type="button"
              >
                {uploading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload {files.length} {files.length === 1 ? 'file' : 'files'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface FileChipProps {
  file: FileWithPreview;
  onRemove: () => void;
}

function FileChip({ file, onRemove }: FileChipProps): React.ReactElement {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return (
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type === 'application/pdf') {
      return (
        <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    );
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-surface-raised border border-default rounded-lg">
      <div className="w-10 h-10 rounded bg-surface-sunken flex items-center justify-center flex-shrink-0">
        {file.preview ? (
          <img src={file.preview} alt={file.name} className="w-full h-full object-cover rounded" />
        ) : (
          getFileIcon(file.type)
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-default truncate">{file.name}</p>
        <p className="text-xs text-muted">{formatFileSize(file.size)}</p>
      </div>

      <button
        onClick={onRemove}
        className="p-1.5 hover:bg-surface-sunken rounded transition-colors"
        aria-label="Remove file"
        type="button"
      >
        <svg className="w-4 h-4 text-muted hover:text-default" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
