import { LogoProps } from "../types";

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-8 h-8 md:w-10 md:h-10",
    medium: "w-10 h-10 md:w-12 md:h-12",
    large: "w-12 h-12 md:w-16 md:h-16",
  };

  return (
    <div className="flex items-center gap-2 z-40">
      <img
        src="/logo.png"
        alt="Photo To Ghibli Logo"
        className={sizeClasses[size]}
      />
      <h2 className="font-medium text-lg md:text-xl ghibli-subtitle">
        Photo To Ghibli
      </h2>
    </div>
  );
};
