import { Meta, Story } from "@storybook/react";

import { DetailsTable, DetailsTableProps } from "./";

export default {
  title: "Component/DetailsTable",
  component: DetailsTable,
} as Meta;

const valueItems: DetailsTableProps = {
  columns: [
    {
      taeg: 1.22,
      taea: 0.24,
      loan: {
        interest: 17387,
        insurance: 5306,
        warrantyFee: 3195,
        bankFee: 1000,
        total: 26889,
      },
      conditions: {
        transfer: true,
        deferment: true,
        iraExemption: true,
      },
    },
    {
      taeg: 1.22,
      taea: 0.24,
      loan: {
        interest: 17387,
        insurance: 5306,
        warrantyFee: 3195,
        bankFee: 1000,
        total: 26889,
      },
      conditions: {
        transfer: true,
        deferment: true,
        iraExemption: true,
      },
    },
    {
      taeg: 1.22,
      taea: 0.24,
      loan: {
        interest: 17387,
        insurance: 5306,
        warrantyFee: 3195,
        bankFee: 1000,
        total: 26889,
      },
      conditions: {
        transfer: true,
        deferment: true,
        iraExemption: true,
      },
    },
    {
      taeg: 1.22,
      taea: 0.24,
      loan: {
        interest: 17387,
        insurance: 5306,
        warrantyFee: 3195,
        bankFee: 1000,
        total: 26889,
      },
      conditions: {
        transfer: true,
        deferment: true,
        iraExemption: true,
      },
    },
    {
      taeg: 1.22,
      taea: 0.24,
      loan: {
        interest: 17387,
        insurance: 5306,
        warrantyFee: 3195,
        bankFee: 1000,
        total: 26889,
      },
      conditions: {
        transfer: true,
        deferment: true,
        iraExemption: true,
      },
    },
  ],
};

const Template: Story<DetailsTableProps> = () => {
  return (
    <div>
      <DetailsTable {...valueItems} />
    </div>
  );
};

export const DetailsTableExemple = Template.bind({});
