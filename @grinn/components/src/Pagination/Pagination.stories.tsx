import { Meta, Story } from "@storybook/react";
import { Pagination, PaginationProps } from "./";

export default {
  title: "Component/Pagination",
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = () => {
  return (
    <div className="h-full bg-gray-50">
      <Pagination totalCount={65} />
    </div>
  );
};

export const PaginationExemple = Template.bind({});
