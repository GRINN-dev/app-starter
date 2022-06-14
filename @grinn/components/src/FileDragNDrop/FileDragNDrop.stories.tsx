import { Meta, Story } from "@storybook/react";
import {
  FileDragNDrop,
  FileDragNDropProps,
} from "../FileDragNDrop/FileDragNDrop";

export default {
  title: "Component/FileDragNDrops",
  component: FileDragNDrop,
} as Meta;

const files: FileDragNDropProps = {
  id: "jo",
  title: "",
  onFileUpload: () => {
    files;
  },
};

const Template: Story = () => {
  return (
    <div>
      <FileDragNDrop id="jo" title={files.title} onFileUpload={() => {}} />
    </div>
  );
};

export const FileDragNDropExample = Template.bind({});
