// Common types for the application

// Error banner props
export interface ErrorBannerProps {
  error: string;
  contactEmail: string;
}

// Logo props
export interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

// Image display props
export interface ImageDisplayProps {
  imageUrl: string | null;
  altText: string;
  className?: string;
}

// Image upload area props
export interface ImageUploadProps {
  onImageUpload: (image: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null> | React.MutableRefObject<HTMLInputElement | null>;
}

// Button props
export interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
}

// Loading indicator props
export interface LoadingIndicatorProps {
  message: string;
}

// Image transformation state
export interface ImageTransformState {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  error: string | null;
  loadingMessage: string;
}
