import { FC } from "react";
import Image from "next/image";
import { RecapTableProps } from "./";
import { Button, ProgressBar, Typography } from "../..";
import { FirstIcon, SecondIcon, ThirdIcon } from "@grinn/icons";

export const RecapTable: FC<RecapTableProps> = ({ columns }) => {
  return (
    <div className="px-4 mt-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Typography
            as="h1"
            className="pl-8 !text-gray-500"
            size="3xl"
            weight="bold"
          >
            Félicitations, {columns.length}{" "}
            {columns.length > 1
              ? "banques vous offrent leurs"
              : "banque vous offre ses"}{" "}
            meilleurs conditions
          </Typography>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="pb-8 overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full text-primary-400">
                <tr className="border-b divide-x">
                  <td className="w-1/4 pl-8">
                    <ProgressBar value={5} maxValue={5} />
                  </td>
                  {columns.map((x, index) => (
                    <th key={index} scope="col">
                      <div className="flex flex-col items-end p-2">
                        <div className="relative w-24 h-24">
                          <Image
                            src={x.bank.logo}
                            alt={x.bank.name}
                            layout="fill"
                            className="object-contain"
                          />
                          {index === 0 && (
                            <FirstIcon className="absolute top-0 left-0 w-12 h-12" />
                          )}
                          {index === 1 && (
                            <SecondIcon className="absolute top-0 left-0 w-12 h-12" />
                          )}
                          {index === 2 && (
                            <ThirdIcon className="absolute top-0 left-0 w-12 h-12" />
                          )}
                        </div>
                        <Button
                          label="Choisir"
                          variant="FILLED"
                          color="ACCENT"
                          type="button"
                        />
                      </div>
                    </th>
                  ))}
                </tr>
                <tr className="divide-x">
                  <th scope="row" className="pl-8 font-normal">
                    <Typography
                      size="xl"
                      className="flex flex-col items-start py-4 !text-gray-400"
                    >
                      Durée
                    </Typography>
                  </th>
                  {columns.map((x, index) => (
                    <td key={index}>
                      <Typography
                        color="primary"
                        size="3xl"
                        weight="bold"
                        className="flex flex-col items-end pr-2"
                      >
                        {x.loanTerm} ans
                      </Typography>
                    </td>
                  ))}
                </tr>
                <tr className="divide-x">
                  <th scope="row" className="pl-8 font-normal">
                    <Typography
                      size="xl"
                      className="flex flex-col items-start py-4 !text-gray-400"
                    >
                      Montant emprunté
                    </Typography>
                  </th>
                  {columns.map((x, index) => (
                    <td key={index}>
                      <Typography
                        color="primary"
                        size="2xl"
                        weight="bold"
                        className="flex flex-col items-end pr-2"
                      >
                        {x.loanAmount} €
                      </Typography>
                    </td>
                  ))}
                </tr>
                <tr className="divide-x">
                  <th scope="row" className="pl-8 font-normal">
                    <Typography
                      size="xl"
                      className="flex flex-col items-start py-4 !text-gray-400"
                    >
                      Taux
                    </Typography>
                  </th>
                  {columns.map((x, index) => (
                    <td key={index}>
                      <Typography
                        color="primary"
                        size="3xl"
                        weight="bold"
                        className="flex flex-col items-end pr-2"
                      >
                        {x.rate} %
                      </Typography>
                    </td>
                  ))}
                </tr>
                <tr className="divide-x">
                  <th scope="row" className="pl-8 font-normal">
                    <div className="flex flex-col items-start py-4">
                      <Typography size="xl" className="!text-gray-400">
                        Mensualité
                      </Typography>
                      <Typography size="md" className="!text-gray-400">
                        hors assurance
                      </Typography>
                    </div>
                  </th>
                  {columns.map((x, index) => (
                    <td key={index}>
                      <Typography
                        color="primary"
                        size="2xl"
                        weight="bold"
                        className="flex flex-col items-end pr-2"
                      >
                        {x.monthlyPayment} €
                      </Typography>
                    </td>
                  ))}
                </tr>
                <tr className="divide-x">
                  <th scope="row" className="pl-8 font-normal">
                    <div className="flex flex-col items-start py-3">
                      <Typography size="xl" className="!text-gray-400">
                        Mensualité
                      </Typography>
                      <Typography size="md" className="!text-gray-400">
                        avec assurance
                      </Typography>
                    </div>
                  </th>
                  {columns.map((x, index) => (
                    <td key={index}>
                      <Typography
                        color="primary"
                        size="2xl"
                        weight="bold"
                        className="flex flex-col items-end pr-2"
                      >
                        {x.monthlyPaymentWithInsurance} €
                      </Typography>
                    </td>
                  ))}
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
