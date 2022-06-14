import { Meta, Story } from "@storybook/react";
import { SelectInput } from "./SelectInput";
import { Forms } from "./Forms";
import { Input } from "./Input/Input";
import { TextArea } from "./TextArea/TextArea";
import { RadioGroup } from "./RadioGroup";
import { CheckBoxGroup } from "./CheckBoxGroup";

export default {
  title: "Component/Forms",
  component: Forms,
} as Meta;

const options = [
  { key: "Crédit agricole", value: "1" },
  { key: "Banque populaire", value: "2" },
];

const Template: Story = () => {
  return (
    <Forms defaultValues="" onSubmit={data => console.log(data)}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="">
          <Input
            name={"identity"}
            description={"Description input"}
            placeholder={"Nom"}
            label={"Identité"}
            options={{
              required: { value: true, message: "ce champ est requis" },
            }}
          />
        </div>
        <div className="">
          <TextArea
            name={"comment"}
            label={"Commentaire"}
            lines={3}
            placeholder="Entrez votre commentaire..."
          />
        </div>
        <div>
          <SelectInput
            name={"Banques"}
            options={options}
            label={"Banques"}
            description="Choisissez votre banque"
          />
        </div>
        <div>
          <RadioGroup
            label={"Projet"}
            name={"project"}
            description={"Choisissez votre type de bien"}
            options={[
              {
                key: "Neuf",
                value: "Neuf",
                description: "Votre bien est neuf",
              },
              {
                key: "Ancien",
                value: "Ancien",
                description: "Votre bien est ancien",
              },
            ]}
          />
        </div>
        <div>
          <CheckBoxGroup
            label={"Contact"}
            description={"Contact"}
            items={[
              {
                key: "Email",
                name: "email",
                description: "Je souhaite être contacté par email",
              },
              {
                key: "Téléphone",
                name: "phone",
                description: "Je souhaite être contacté par téléphone",
              },
            ]}
          ></CheckBoxGroup>
        </div>
        <div className="mt-24">
          <button type="submit">Soummetre</button>
        </div>
      </div>
    </Forms>
  );
};

export const FormsExample = Template.bind({});
