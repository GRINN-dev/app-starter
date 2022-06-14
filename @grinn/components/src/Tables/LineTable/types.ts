import { HTMLAttributes, ReactElement } from "react";
export interface LineTableProps extends HTMLAttributes<HTMLOrSVGElement> {
  title: string;
  headers: (string | { label: string; subHeaders: string[] })[];
  columns: {
    title: string;
    data: (string | number | boolean | ReactElement | SubData)[];
  }[];
}
export interface SubData {
  main: string | boolean | number | ReactElement;
  details: (string | number | ReactElement)[];
}
export interface FlattenRow {
  header: string;
  nested: boolean;
  data: (string | number | boolean | ReactElement | SubData)[];
}
