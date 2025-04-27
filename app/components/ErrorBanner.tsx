import { AlertTriangle, Mail } from "lucide-react";
import { ErrorBannerProps } from "../types";

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  error,
  contactEmail,
}) => {
  if (!error) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500/90 backdrop-blur-md text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto max-w-4xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6" />
          <div>
            <p className="font-medium">Processing Error</p>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Mail size={16} />
          <a href={`mailto:${contactEmail}`} className="hover:underline">
            {contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
};
