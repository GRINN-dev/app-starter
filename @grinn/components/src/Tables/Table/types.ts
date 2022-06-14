import { HTMLAttributes, ReactElement } from "react";

export interface TableProps extends HTMLAttributes<HTMLOrSVGElement> {
  header?: {
    id?: string;
    title: string;
    isSortable: boolean;
    onSort?: (order: "ASC" | "DESC" | "NATURAL") => void;
  }[];
  body?: RowProps[];
}

export interface RowProps extends HTMLAttributes<HTMLOrSVGElement> {
  data: CellProps[];
}
export interface CellProps extends HTMLAttributes<HTMLOrSVGElement> {
  data: string | boolean | number | ReactElement;
}
