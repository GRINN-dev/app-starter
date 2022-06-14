import { ReactElement } from "react";

export interface SideBarLinkProps {
  title: string;
  icon: ReactElement;
  color: string;
  active: boolean;
  notification: number;
  link: string;
  secondary: boolean;
  collapsed?: boolean;
}
