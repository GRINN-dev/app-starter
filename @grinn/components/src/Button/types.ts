import { ElementType } from "react";

export interface ButtonProps {
  label?: string;
  variant?: "OUTLINED" | "FILLED" | "LINK" | undefined;
  color?: "PRIMARY" | "SECONDARY" | "ACCENT" | "WHITE" | undefined;
  prefixIcon?: any;
  suffixIcon?: any;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  as?: ElementType;
  className?: string;
  children?: React.ReactNode;
}
