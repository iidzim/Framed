import React, { ComponentPropsWithoutRef, ElementType } from "react";

import cn from "classnames";

type Props<T extends ElementType> = {
  label: string;
  onClick: () => void;
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  className?: string;
  pill?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "normal" | "large";
} & ComponentPropsWithoutRef<T>;

const styles = {
  base: "focus:outline-none rounded-md flex items-center justify-center transition ease-in-out duration-300",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2 text-normal",
    large: "px-8 py-3 text-lg",
  },
  variant: {
    primary:
      "bg-primary hover:bg-primary-700 focus:ring-2 focus:ring-secondary/60 text-white",
    secondary:
      "bg-white-200 hover:bg-secondary hover:bg-secondary/20 focus:ring-2 ring-secondary focus:ring-secondary/50 text-secondary hover:text-secondary",
    danger:
      "bg-red-500 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
  },
};

const Button: React.FC<Props<ElementType>> = ({
  label,
  onClick,
  className,
  variant = "primary",
  size = "normal",
  pill,
  disabled = false,
  ...props
}: Props<ElementType>) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        styles.base,
        styles.size[size],
        styles.variant[variant],
        pill && styles.pill,
        disabled && styles.disabled,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
