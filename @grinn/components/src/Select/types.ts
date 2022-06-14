import { ChangeEvent } from "react";
export interface SelectProps {
  name: string;
  listedValues: Options[];
  selectedValue: Options[];
  onChange: (e: any) => void;
}

interface Options {
  label: string | boolean | number;
  value: string | boolean | number;
}
