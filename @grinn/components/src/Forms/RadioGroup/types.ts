export interface RadioGroupProps {
  label: string;
  name: string;
  description: string;
  options: { key: string; description: string; value: any }[];
}
