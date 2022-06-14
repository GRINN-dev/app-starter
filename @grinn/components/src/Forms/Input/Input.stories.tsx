import { Meta, Story } from "@storybook/react";
import { Input } from "./Input";

export default {
  title: "Component/Input",
  component: Input,
} as Meta;

const Template: Story = () => {
  return <Input name={""} placeholder={""} label={""}></Input>;
};

export const InputExample = Template.bind({});
