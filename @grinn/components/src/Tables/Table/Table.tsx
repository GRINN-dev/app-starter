import { DownIcon, RoundedIcon, StarIcon } from "@grinn/icons";
import React from "react";
import { FC, useState } from "react";
import { Typography } from "../../Typography";
import { TableProps, RowProps } from "./";

const TableHeader: FC<TableProps> = ({ header }) => {
  const [sortedColumn, setIsSortedColumn] = useState<{
    columnIndex: number;
    order: "ASC" | "DESC";
  } | null>(null);

  return (
    <tr className="text-gray-400">
      {header?.map((x, index) => {
        const columnSortOrder =
          sortedColumn?.columnIndex !== index ? null : sortedColumn?.order;
        return (
          <th key={index}>
            <div className="flex items-end px-1 py-4 text-gray-400">
              <Typography
                as="span"
                size="sm"
                className={`text-left !text-gray-400 ${
                  columnSortOrder && "!text-primary-500"
                }`}
              >
                {x.title}
              </Typography>
              {x.isSortable && (
                <button
                  className="self-center"
                  onClick={() => {
                    x.onSort!(
                      sortedColumn?.order === "ASC"
                        ? "DESC"
                        : sortedColumn?.order === "DESC"
                        ? "NATURAL"
                        : "ASC"
                    );
                    setIsSortedColumn(
                      sortedColumn?.order === "DESC"
                        ? null
                        : {
                            columnIndex: index,
                            order:
                              sortedColumn?.order === "ASC" ? "DESC" : "ASC",
                          }
                    );
                  }}
                >
                  <DownIcon
                    className={`w-6 h-6 ${
                      columnSortOrder && " text-primary-500 "
                    } ${columnSortOrder === "ASC" && "rotate-180"}`}
                  />
                </button>
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
};

const TableRow: FC<{ row: RowProps }> = ({ row }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <tr className={`${row.className} bg-white text-gray-600`}>
      {row?.data?.map((x, index) => (
        <td
          key={index}
          className={`${x.className || ""} ${
            index === row?.data?.length - 1
              ? "rounded-r-lg"
              : index === 0
              ? "rounded-l-lg"
              : ""
          } `}
        >
          <Typography
            as="div"
            size="md"
            className={`${index === 0 ? "px-4" : "pr-2"} py-2 flex flex-col`}
          >
            {x.data}
          </Typography>
        </td>
      ))}
      {/*       <td>
        <span className="flex justify-center">
          <RoundedIcon className="w-2 h-2 text-gray-200" />
        </span>
      </td>
      <td>
        <button className="px-4" onClick={() => setIsFavourite(!isFavourite)}>
          <StarIcon
            className={`${
              isFavourite ? "text-yellow-300" : "text-gray-200"
            } w-3 h-3`}
          />
        </button>
      </td> */}
    </tr>
  );
};

const TableUnmemo: FC<TableProps> = ({ header, body }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col ">
        <table className="min-w-full gfg">
          <thead className="">
            <TableHeader header={header} />
          </thead>
          <tbody className="">
            {body?.map((x, index) => (
              <TableRow row={x} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Table = React.memo(TableUnmemo);
