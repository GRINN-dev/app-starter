import { Meta, Story } from "@storybook/react";
import { Table, TableProps } from "./";

export default {
  title: "Component/Table",
  component: Table,
} as Meta;

const values: TableProps = {
  header: [
    { title: "", isSortable: false },
    { title: "Montant recherché", isSortable: true },
    { title: "Durée", isSortable: true },
    { title: "Usage", isSortable: true },
    { title: "Type de bien", isSortable: true },
    { title: "Localisation", isSortable: true },
    { title: "Statut professionnel", isSortable: true },
    { title: "Age", isSortable: true },
    { title: "Revenu annuel moyen / pers", isSortable: true },
    { title: "Timer", isSortable: true },
    /*     { title: "Proposition concurrente", isFilterable: true },
    { title: "", isFilterable: false }, */
  ],
  body: [
    {
      data: [
        { data: "JOURDAN Paul", className: "" },
        { data: "200000" },
        { data: "20" },
        { data: "RP" },
        { data: "Ancien" },
        { data: "33200" },
        { data: "Cadre" },
        { data: "27" },
        { data: "30000" },
        { data: "10" },
      ],
      className: "",
    },
    {
      data: [
        { data: "SHABOUNE Imane" },
        { data: "250000" },
        { data: "20" },
        { data: "Invest" },
        { data: "Ancien" },
        { data: "92110" },
        { data: "Chef d'entreprise" },
        { data: "44" },
        { data: "65000" },
        { data: "10" },
      ],
      className: "",
    },
    {
      data: [
        { data: "MONTGOMERY Gwenaël" },
        { data: "150000" },
        { data: "12" },
        { data: "RS" },
        { data: "Ancien" },
        { data: "16370" },
        { data: "Artisan" },
        { data: "39" },
        { data: "35000" },
        { data: "9" },
      ],
      className: "",
    },
  ],
};

const Template: Story<TableProps> = () => {
  return (
    <div className="h-full bg-gray-50">
      <Table {...values} />
    </div>
  );
};

export const TableExemple = Template.bind({});
