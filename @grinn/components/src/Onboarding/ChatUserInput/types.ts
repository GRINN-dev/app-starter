export interface ChatUserInputProps {
  input:
    | { type: "numberInput"; min: number; placeholder: string }
    | { type: "textInput"; placeholder: string }
    | { type: "select"; options: string[]; placeholder: string }
    | { type: "dateInput"; placeholder: string }
    | { type: "radio"; options: string[]; placeholder: string }
    | { type: "textarea"; placeholder: string }
    | { type: "email"; placeholder: string }
    | { type: "tel"; placeholder: string };

  anchor?: string;
}
