import { RegisterOptions } from "react-hook-form";
export interface InputProps {
  name: string;
  options?: RegisterOptions<any>; //ValidationRule ?
  placeholder: string;
  description?: string;
  label: string;
}
