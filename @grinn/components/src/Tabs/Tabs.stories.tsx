import { Meta, Story } from "@storybook/react";
import { Tabs, TabsProps } from "./";
import { EyeIcon, ReportIcon, DocumentIcon } from "@grinn/icons";
import { FC } from "react";

export default {
  title: "Component/Tabs",
  component: Tabs,
} as Meta;

const EmptyTable: FC<{ title: string }> = props => {
  const { title } = props;
  return (
    <>
      <span>{title}</span>
      <div className="p-6 bg-white rounded-lg">
        <table>
          <tr>
            <td>Item 1</td>
            <th>Content</th>
            <th>Content</th>
            <th>Content</th>
          </tr>
          <tr>
            <td>Item 2</td>
            <th>Content</th>
            <th>Content</th>
            <th>Content</th>
          </tr>
          <tr>
            <td>Item 3</td>
            <th>Content</th>
            <th>Content</th>
            <th>Content</th>
          </tr>
        </table>
      </div>
    </>
  );
};

const valueItems: TabsProps = {
  tab: [
    {
      label: "Détail du projet",
      icon: <EyeIcon className="w-5 h-5 text-gray-400" />,
      content: <EmptyTable title="Content 1" />,
    },
    {
      label: "Analyse crédit",
      icon: <ReportIcon className="w-5 h-5 text-gray-400" />,
      content: <EmptyTable title="Content 2" />,
    },
    {
      label: "Documents",
      icon: <DocumentIcon className="w-5 h-5 text-gray-400" />,
      content: <EmptyTable title="Content 3" />,
    },
  ],
};

const Template: Story<TabsProps> = () => {
  return (
    <div className="h-full bg-gray-50">
      <Tabs {...valueItems} />
    </div>
  );
};

export const TabsExemple = Template.bind({});
