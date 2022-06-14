import React from "react";
import { Meta, Story } from "@storybook/react";

import { TextInput, TextInputProps } from "./TextInput";

export default {
  title: "Component/TextInput",
  component: TextInput,
} as Meta;

const textInputItems: TextInputProps = {
  data: [
    {
      label: "Dans quelle commune ? (Ville ou code postal)",
      placeholder: "Votre code postal ou ville",
    },
  ],
};

const Template: Story = () => {
  return (
    <div>
      <TextInput {...textInputItems} />
    </div>
  );
};

export const TextInputExample = Template.bind({});
