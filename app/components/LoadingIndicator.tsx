import { Loader2 } from "lucide-react";
import { LoadingIndicatorProps } from "../types";

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message,
}) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping"></div>
        <Loader2 className="w-12 h-12 text-accent animate-spin relative z-10" />
      </div>
      <p className="text-center text-sm text-muted-foreground max-w-xs ghibli-subtitle">
        {message}
      </p>
    </div>
  );
};
