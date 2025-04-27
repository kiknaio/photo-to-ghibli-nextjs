import { ImageDisplayProps } from "../types";

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  imageUrl,
  altText,
  className = "",
}) => {
  return (
    <div
      className={`relative aspect-square rounded-xl overflow-hidden border border-border shadow-md ${className}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-contain"
          style={{
            imageOrientation: "from-image",
          }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-muted-foreground text-center px-4 ghibli-subtitle">
            {altText}
          </p>
        </div>
      )}
    </div>
  );
};
