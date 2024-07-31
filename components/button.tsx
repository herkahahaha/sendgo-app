import * as React from "react";
import clsx from "clsx";

interface buttonPrimary {
  label: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
type ButtonProps = buttonPrimary &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, label, type, disabled, onClick, ...rest }, ref) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        ref={ref}
        className={clsx(
          className,
          "p-2 w-auto outline outline-2 text-xs rounded-md"
        )}
        {...rest}
      >
        {label}
      </button>
    );
  }
);

PrimaryButton.displayName = "PrimaryButton";
