import { Meta, Story } from "@storybook/react";
import { FileDragNDropProps } from "../FileDragNDrop/FileDragNDrop";
import { DocumentUploadCard } from "./DocumentUploadCard";
import { FileDragNDropExample } from "../FileDragNDrop/FileDragNDrop.stories";

export default {
  title: "Component/DocumentUploadCards",
  component: DocumentUploadCard,
} as Meta;

const files: FileDragNDropProps = {
  id: "jojo",
  title: "Identité",
  onFileUpload: () => {
    files;
  },
};

const Template: Story = () => {
  return (
    <div>
      <DocumentUploadCard
        title={"Salaires"}
        description={"Chargez vos 3 derniers bulletins de salaire"}
        onChange={function (files: File[]): void {
          console.log(files);
        }}
      />
      {/* <FileDragNDropExample title={files.title} onFileUpload={() => {}} /> */}
    </div>
  );
};

export const DocumentUploadCardExample = Template.bind({});
