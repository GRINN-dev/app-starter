import { RegisterOptions } from "react-hook-form";
export interface CheckBoxGroupProps {
  label: string;
  description: string;
  items: { key: string; description: string; name: string }[];
  options?: RegisterOptions<any>;
}
