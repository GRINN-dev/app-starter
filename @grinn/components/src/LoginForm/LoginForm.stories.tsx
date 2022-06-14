import { Meta, Story } from "@storybook/react";
import { LoginFormProps, LoginForm, LoginFormData } from "./";

export default {
  title: "Component/LoginForm",
  component: LoginForm,
} as Meta;

const Template: Story<LoginFormProps> = () => {
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="h-screen bg-gray-50">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export const LoginFormExemple = Template.bind({});
