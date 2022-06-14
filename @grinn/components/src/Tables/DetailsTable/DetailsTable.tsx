import { FC } from "react";
import { DetailsTableProps } from "./";

export const DetailsTable: FC<DetailsTableProps> = ({ columns }) => {
  return (
    <table className="min-w-full mb-8 text-gray-500">
      <tr className="divide-x bg-gray-50">
        <th scope="row" className="w-1/4 pl-8 font-normal text-gray-400">
          <span className="flex flex-col items-start py-3">{"TAEG (%)"}</span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">{x.taeg} %</span>
          </td>
        ))}
      </tr>
      <tr className="divide-x bg-gray-50">
        <th scope="row" className="pl-16 font-normal text-gray-400">
          <span className="flex flex-col items-start py-3">{"TAEA (%)"}</span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">{x.taea} %</span>
          </td>
        ))}
      </tr>
      <tr className="divide-x">
        <th scope="row" className="pl-8 font-normal text-gray-400">
          <span className="flex flex-col items-start py-3">
            Coût total du prêt
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.loan.total} €
            </span>
          </td>
        ))}
      </tr>
      <tr className="text-sm divide-x">
        <th scope="row" className="pl-16 font-normal text-gray-400">
          <span className="flex flex-col items-start py-2">
            + Coût des intérêts
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.loan.interest} €
            </span>
          </td>
        ))}
      </tr>
      <tr className="text-sm divide-x">
        <th scope="row" className="pl-16 font-normal text-gray-400">
          <span className="flex flex-col items-start py-2">
            + Coût de l'assurance
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.loan.insurance} €
            </span>
          </td>
        ))}
      </tr>
      <tr className="text-sm divide-x">
        <th scope="row" className="pl-16 font-normal text-gray-400">
          <span className="flex flex-col items-start py-2">
            + Frais de garantie
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.loan.warrantyFee} €
            </span>
          </td>
        ))}
      </tr>
      <tr className="text-sm divide-x">
        <th scope="row" className="pl-16 font-normal text-gray-400">
          <span className="flex flex-col items-start py-2">
            + Frais bancaires
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.loan.bankFee} €
            </span>
          </td>
        ))}
      </tr>
      <span className="pl-8 text-xl">Conditions</span>
      <tr className="border-t divide-x bg-gray-50">
        <th scope="row" className="pl-12 font-normal text-gray-400">
          <span className="flex flex-col items-start py-3">
            Transférabilité du prêt
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.conditions.transfer === true ? "Oui" : "Non"}
            </span>
          </td>
        ))}
      </tr>
      <tr className="divide-x">
        <th scope="row" className="pl-12 font-normal text-gray-400">
          <span className="flex flex-col items-start py-3">
            Modularité/report du prêt
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.conditions.deferment === true ? "Oui" : "Non"}
            </span>
          </td>
        ))}
      </tr>
      <tr className="divide-x bg-gray-50">
        <th scope="row" className="pl-12 font-normal text-gray-400">
          <span className="flex flex-col items-start py-3">
            Exonération IRA
          </span>
        </th>
        {columns.map((x, index) => (
          <td key={index}>
            <span className="flex flex-col items-end pr-2">
              {x.conditions.iraExemption === true ? "Oui" : "Non"}
            </span>
          </td>
        ))}
      </tr>
    </table>
  );
};
