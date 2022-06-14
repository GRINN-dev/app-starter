import { Meta, Story } from "@storybook/react";
import { Loader } from "./Loader";

export default {
  title: "Component/Loader",
  component: Loader,
} as Meta;

const Template: Story = () => {
  return <Loader message="Chaaaaarrgez !!!" />;
};

export const DocumentUploadCardExample = Template.bind({});
