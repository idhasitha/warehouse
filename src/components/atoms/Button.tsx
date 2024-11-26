import { FC } from "react";
import CN from "classnames";

interface ButtonProps {
  children?: string;
  onClick?: any;
  size?: "default" | "small" | "large";
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  size,
  className,
  isDisabled,
  isLoading,
}) => {
  return (
    <button
      className={CN(
        "flex gap-2 rounded-sm border border-gray-500 bg-transparent font-semibold text-[#00598dcd] hover:border-transparent hover:bg-[#00598d] hover:text-white",
        {
          "px-2 py-1 text-sm": size === "small",
          "px-6 py-5 text-sm": size === "large",
          "cursor-not-allowed border-none !bg-gray-300 !text-gray-500 !hover:bg-gray-300":
            isDisabled,
        },
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};

Button.defaultProps = {
  children: "Button",
  onClick: undefined,
};

export default Button;
