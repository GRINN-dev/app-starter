import { RegisterOptions } from "react-hook-form";
export interface TextAreaProps {
  name: string;
  options?: RegisterOptions<any>;
  placeholder?: string;
  description?: string;
  label: string;
  lines: number;
}
