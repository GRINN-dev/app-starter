import { Meta, Story } from "@storybook/react";
import { ChatMessage } from ".";

export default {
  title: "Component/Onboarding/Chat Message",
  component: ChatMessage,
} as Meta;

const Template: Story = () => {
  return (
    <div className="w-full p-12 bg-gray-200">
      <ChatMessage
        message={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ducimus natus amet iusto esse corporis odio modi alias in vitae. Cum eius error beatae autem iste tempore ea nihil dolorum."
        }
        type={"received"}
        date={"2022-01-02 10:23:12"}
      />
      <ChatMessage
        message={"hello"}
        type={"received"}
        date={"2022-01-02 10:23:12"}
      />
      <ChatMessage
        message={"ca va ?"}
        type={"received"}
        date={"2022-01-02 10:23:12"}
      />
      <ChatMessage
        message={"On vous demande comment vous allez"}
        type={"information"}
        date={"2022-01-02 10:23:12"}
      />
      <ChatMessage
        message={"oui super !"}
        type={"sent"}
        date={"2022-01-02 10:23:12"}
      />
      <ChatMessage
        message={"oui super !"}
        type={"sent"}
        date={"2022-01-02 10:23:12"}
      />
    </div>
  );
};

export const SideBarExample = Template.bind({});
