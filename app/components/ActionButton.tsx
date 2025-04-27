import { ActionButtonProps } from "../types";

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  children,
  variant = "primary",
}) => {
  const variantClasses = {
    primary: "primary-button",
    secondary: "secondary-button",
    tertiary: "tertiary-button",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`ghibli-button ${variantClasses[variant]} w-full py-3.5 md:py-4 px-4 rounded-xl shadow-md text-xl md:text-2xl ghibli-title cursor-pointer`}
    >
      <span className="button-content">{children}</span>
    </button>
  );
};
