import { ElementType, HTMLAttributes } from "react";

export interface TypographyProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
  weight?: "normal" | "bold";
  color?: "primary" | "secondary" | "accent" | "white" | "black";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  tracking?: "normal" | "wide";
  uppercase?: boolean;
  underline?: boolean;
  textAlign?: "start" | "end" | "center";
  lineHeight?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  lineThrough?: boolean;
  className?: string;
  id?: string;
  children: React.ReactNode;
}
