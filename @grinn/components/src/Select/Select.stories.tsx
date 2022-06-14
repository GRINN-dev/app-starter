import { Meta, Story } from "@storybook/react";
import { SelectProps, Select } from "./";

export default {
  title: "Component/Select",
  component: Select,
} as Meta;

const main: SelectProps = {
  name: "main",
  listedValues: [{ label: false, value: false }],
  selectedValue: [{ label: true, value: true }],
  onChange: e => {
    e.preventDefault();
    console.log(e.target.value);
  },
};

const Template: Story<SelectProps> = () => {
  return (
    <div>
      <Select {...main} />
    </div>
  );
};

export const SelectExemple = Template.bind({});
