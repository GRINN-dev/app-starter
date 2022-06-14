import { Meta, Story } from "@storybook/react";
import { ChatRecapForm } from ".";

export default {
  title: "Component/Onboarding/Chat Recap",
  component: ChatRecapForm,
} as Meta;

const Template: Story = () => {
  return (
    <div className="w-full p-12 bg-gray-200">
      <ChatRecapForm
        template={[
          " Vous avec ",
          { data: "3", href: "children-input" },
          " enfants et ",
          { data: "2", href: "dogs-input" },
          " chiens, qui vous coûtent tous les mois",
          {
            data: (134200).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            }),
            href: "children-input",
          },
          "mais qui vous aiment vraiment beacoup !",
        ]}
      />
    </div>
  );
};

export const SideBarExample = Template.bind({});
