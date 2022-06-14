import { Meta, Story } from "@storybook/react";
import { ToolTip, ToolTipProps } from "./";
import { QuestionIcon } from "@grinn/icons";

export default {
  title: "Component/ToolTip",
  component: ToolTip,
} as Meta;

const value1: ToolTipProps = {
  icon: QuestionIcon,
  position: "TOP",
};
const value2: ToolTipProps = {
  icon: QuestionIcon,
  position: "BOTTOM",
};
const value3: ToolTipProps = {
  icon: QuestionIcon,
  position: "LEFT",
};
const value4: ToolTipProps = {
  icon: QuestionIcon,
  position: "RIGHT",
};

const Template: Story<ToolTipProps> = () => {
  return (
    <div className="flex flex-col gap-16 p-16 text-gray-700 bg-gray-50">
      <div>
        Tooltip top <ToolTip {...value1}>Apparait en haut</ToolTip>
      </div>
      <div>
        {" "}
        Tooltip bottom default <ToolTip {...value2}>Apparait en bas</ToolTip>
      </div>
      <div>
        <ToolTip {...value3}> Apparait à gauche</ToolTip> Tooltip left
      </div>
      <div>
        Tooltip right <ToolTip {...value4}> Apparait à droite</ToolTip>
      </div>
    </div>
  );
};

export const ToolTipExemple = Template.bind({});
