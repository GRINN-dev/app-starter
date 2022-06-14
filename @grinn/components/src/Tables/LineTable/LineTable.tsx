import { FC } from "react";
import { Typography } from "../../Typography";
import { FlattenRow, LineTableProps } from ".";
import { SubData } from "./types";

let bgGray = true;

export const LineTable: FC<LineTableProps> = ({ title, headers, columns }) => {
  const horizontalHeader = columns.map(column => column.title);
  const rows = headers.reduce<FlattenRow[]>(
    (previousRows, currentRow, index, _array) => {
      if (typeof currentRow === "string") {
        return [
          ...previousRows,
          {
            header: currentRow,
            nested: false,
            data: columns.map(column => {
              const data = column.data[index] || "";
              return data;
            }),
          },
        ];
      }
      return [
        ...previousRows,
        {
          header: currentRow.label,
          nested: false,
          data: columns.map(column => (column.data[index] as SubData).main),
        },
        ...currentRow.subHeaders.map((subHeader, secondIndex) => {
          return {
            header: subHeader,
            nested: true,
            data: columns.map(
              column => (column.data[index] as SubData).details[secondIndex]
            ),
          };
        }),
      ];
    },
    []
  );

  return (
    <div>
      <div className="flex flex-col text-gray-500">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full bg-white">
                <tr className="border-b">
                  <th className="py-2 pl-6 text-left">
                    <Typography as="span" size="xl" className="capitalize">
                      {title}
                    </Typography>
                  </th>
                  {horizontalHeader.map((h, index) => (
                    <th key={index} className="py-2 pr-6 text-right">
                      <Typography as="span" size="xs" uppercase>
                        {h}
                      </Typography>
                    </th>
                  ))}
                </tr>
                {rows.map((row, index) => {
                  if (!row.nested) bgGray = !bgGray;
                  return (
                    <tr className={`${bgGray && "bg-gray-50"}`}>
                      <td
                        className={`${
                          row.nested ? "pl-10" : "pl-6"
                        } py-2 text-left text-gray-400`}
                      >
                        <Typography
                          as="span"
                          size={row.nested ? "sm" : "md"}
                          className="capitalize !text-gray-400"
                        >
                          {row.nested && rows[index - 1]?.nested && "+"}{" "}
                          {row.header}
                        </Typography>
                      </td>
                      {row.data.map((r, index) => (
                        <td
                          key={index}
                          className={`${
                            row.data.length > 1
                              ? "text-right pr-6"
                              : "text-left"
                          } py-2`}
                        >
                          <Typography as="span" className="capitalize">
                            <>{r === true ? "oui" : r === false ? "non" : r}</>
                          </Typography>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
