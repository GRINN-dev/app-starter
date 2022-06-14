export interface SelectProps {
  name: string;
  options: { key: string; value: any }[];
  placeholder?: string;
  description?: string;
  label: string;
}
