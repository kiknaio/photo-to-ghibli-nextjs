'use client';

import { Upload } from 'lucide-react';
import { ImageUploadProps } from '../types';

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload,
  fileInputRef
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="border-2 border-dashed border-border rounded-xl p-8 md:p-16 text-center cursor-pointer bg-white/10 backdrop-blur-sm"
      onClick={() => fileInputRef.current && fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef as React.RefObject<HTMLInputElement>}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-6">
        <Upload className="w-10 h-10 text-accent" />
      </div>
      <p className="text-lg md:text-xl font-medium mb-2 ghibli-subtitle">
        Begin Your Magical Journey
      </p>
      <p className="text-muted-foreground text-sm md:text-base">
        Drop your image here or click to upload
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Supported formats: JPG, PNG, WebP
      </p>
    </div>
  );
};
