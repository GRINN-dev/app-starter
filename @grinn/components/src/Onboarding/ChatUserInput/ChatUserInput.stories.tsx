import { Meta, Story } from "@storybook/react";
import { ChatUserInput } from ".";

export default {
  title: "Component/Onboarding/Chat User Input",
  component: ChatUserInput,
} as Meta;

const Template: Story = () => {
  return (
    <div className="w-full p-12 bg-gray-200">
      <ChatUserInput
        input={{
          type: "numberInput",
          min: 0,
          placeholder: "",
        }}
      />
      <ChatUserInput
        input={{
          type: "textInput",
          placeholder: "",
        }}
      />
    </div>
  );
};

export const SideBarExample = Template.bind({});
