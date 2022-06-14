import { Meta, Story } from "@storybook/react";
import { LineTable, LineTableProps } from ".";

export default {
  title: "Component/LineTable",
  component: LineTable,
} as Meta;

const values1: LineTableProps = {
  title: "description",
  headers: [
    "type de bien",
    "usage de l'achat",
    "localisation",
    "surface",
    "primo accédant",
    "travaux",
    "éligible PTZ",
  ],
  columns: [
    {
      title: "",
      data: [
        "appartement ancien",
        "résidence principale",
        "5 rue du delta 75009",
        "30m2",
        false,
        true,
        false,
      ],
    },
  ],
};

const values2: LineTableProps = {
  title: "financement recherché",
  headers: [
    "durée souhaitée",
    "type de taux",
    "apport",
    "montant", // details de "montant"
    "prix FAI",
    "montant des travaux",
    "apport",
    {
      label: "estimation des frais",
      subHeaders: [
        "frais de notaire",
        "frais de garantie",
        "frais bancaires",
        "frais de courtage",
      ],
    },
  ],
  columns: [
    {
      title: "",
      data: [
        "15 ans",
        "fixe",
        "10.30%",
        "289 970 €",
        "275 000 €",
        "20 000 €",
        "30 000 €",

        {
          main: "24 970 €",
          details: ["20 775 €", "3 195 €", "1 000 €", "0 €"],
        },
      ],
    },
  ],
};

const values3: LineTableProps = {
  title: "personnel",
  headers: [
    "civilité",
    "nom",
    "prénom",
    "age",
    "date de naissance",
    "lieu de naissance",
  ],
  columns: [
    {
      title: "emprunteur",
      data: [
        "monsieur",
        "leroy",
        "pierre",
        "34 ans",
        "11/08/1987",
        "sartouville",
      ],
    },
    {
      title: "co-emprunteur",
      data: ["madame", "leroy", "karine", "35 ans", "17/09/1986", "biarritz"],
    },
  ],
};

const values4: LineTableProps = {
  title: "ménage",
  headers: [
    "adresse",
    "statut habitation",
    "loyer actuel",
    "nb enfants à charge",
  ],
  columns: [
    { title: "", data: ["23 rue du poulet", "locataire", "1 400 €", 0] },
  ],
};

const Template: Story<LineTableProps> = () => {
  return (
    <div className="h-full pt-8 bg-secondary-50 bg-opacity-20">
      <div className="grid grid-cols-2 gap-6 py-4 mx-4 bg-white rounded-lg shadow">
        <LineTable {...values1} />
        <LineTable {...values3} />
        <LineTable {...values2} />
        <LineTable {...values4} />
      </div>
    </div>
  );
};

export const LineTableExemple = Template.bind({});
