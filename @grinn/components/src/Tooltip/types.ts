import { ComponentType, ReactElement, SVGProps } from "react";

export interface ToolTipProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  position?: "TOP" | "BOTTOM" | "LEFT" | "RIGHT";
  children?: React.ReactNode;
}
