import { Meta, Story } from "@storybook/react";
import { ProgressBar, ProgressBarProps } from "./";

export default {
  title: "Component/ProgressBar",
  component: ProgressBar,
} as Meta;

const value = 3;
const maxValue = 10;

const Template: Story<ProgressBarProps> = () => {
  return (
    <div>
      <ProgressBar value={value} maxValue={maxValue} />
    </div>
  );
};

export const ProgressBarExemple = Template.bind({});
