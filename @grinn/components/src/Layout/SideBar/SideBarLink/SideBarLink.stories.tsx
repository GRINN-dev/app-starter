import { Meta, Story } from "@storybook/react";
import { SideBarLink } from "./SideBarLink";
import { ClipIcon } from "@grinn/icons";
import { SideBarLinkProps } from "./types";

export default {
  title: "Component/SideBar",
  component: SideBarLink,
} as Meta;

const linkItems: SideBarLinkProps = {
  title: "Mes documents",
  icon: <ClipIcon />,
  color: "#ff7f00",
  active: true,
  notification: 4,
  link: "documents",
  secondary: false,
};

const Template: Story = () => {
  return (
    <div>
      <SideBarLink
        title={linkItems.title}
        icon={linkItems.icon}
        color={linkItems.color}
        active={linkItems.active}
        notification={linkItems.notification}
        link={linkItems.link}
        secondary={linkItems.secondary}
      />
    </div>
  );
};

export const SideBarLinkExample = Template.bind({});
