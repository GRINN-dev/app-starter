import { Meta, Story } from "@storybook/react";

import { RecapTable, RecapTableProps } from "./";

export default {
  title: "Component/RecapTable",
  component: RecapTable,
} as Meta;

const valueItems: RecapTableProps = {
  columns: [
    {
      offerId: "1234",
      bank: {
        id: "1234",
        name: "crédit agricole",
        logo: "https://movesol.com/app/uploads/2020/04/1200px-Cr%C3%A9dit_Agricole.svg-2-e1589553257527.png",
      },
      loanTerm: 15,
      loanAmount: 289970,
      rate: 0.78,
      monthlyPayment: 1708,
      monthlyPaymentWithInsurance: 1737,
    },
    {
      offerId: "1234",
      bank: {
        id: "1234",
        name: "crédit mutuel",
        logo: "https://www.lamaisonabordable.fr/photos/diapo/logo-credit-mutuel-1655.jpg",
      },
      loanTerm: 15,
      loanAmount: 289970,
      rate: 0.78,
      monthlyPayment: 1708,
      monthlyPaymentWithInsurance: 1737,
    },
    {
      offerId: "1234",
      bank: {
        id: "1234",
        name: "caisse d'épargne",
        logo: "https://independant.io/wp-content/uploads/Caisse-d-Epargne-logo.png",
      },
      loanTerm: 15,
      loanAmount: 289970,
      rate: 0.78,
      monthlyPayment: 1708,
      monthlyPaymentWithInsurance: 1737,
    },
    {
      offerId: "1234",
      bank: {
        id: "1234",
        name: "crédit mutuel",
        logo: "https://www.lamaisonabordable.fr/photos/diapo/logo-credit-mutuel-1655.jpg",
      },
      loanTerm: 15,
      loanAmount: 289970,
      rate: 0.78,
      monthlyPayment: 1708,
      monthlyPaymentWithInsurance: 1737,
    },
    {
      offerId: "1234",
      bank: {
        id: "1234",
        name: "caisse d'épargne",
        logo: "https://independant.io/wp-content/uploads/Caisse-d-Epargne-logo.png",
      },
      loanTerm: 15,
      loanAmount: 289970,
      rate: 0.78,
      monthlyPayment: 1708,
      monthlyPaymentWithInsurance: 1737,
    },
  ],
};

const Template: Story<RecapTableProps> = () => {
  return (
    <div>
      <RecapTable {...valueItems} />
    </div>
  );
};

export const RecapTableExemple = Template.bind({});
