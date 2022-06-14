import { Meta, Story } from "@storybook/react";
import { ClipIcon, DocumentIcon, KeyIcon, WheelIcon } from "@grinn/icons";
import { SideBar } from "./SideBar";
import { SideBarLink } from "./SideBarLink/SideBarLink";
import { SideBarLinkProps } from "./SideBarLink/types";
import { SideBarProps } from "./types";

const items: SideBarProps = {
  logo1: "/public/logo.svg",

  alt: "grinn-logo",
};

const linkItems1: SideBarLinkProps = {
  title: "Mes propositions",
  active: true,
  color: "#ff7f00",
  icon: <ClipIcon width={20} height={20} />,
  link: "",
  notification: 5,
  secondary: false,
};

const linkItems2: SideBarLinkProps = {
  title: "Mes documents",
  icon: <DocumentIcon width={20} height={20} />,
  color: "#5F92CD",
  active: false,
  notification: 0,
  link: "",
  secondary: false,
};

const linkItems3: SideBarLinkProps = {
  title: "Mon projet",
  icon: <KeyIcon width={20} height={20} />,
  color: "#69C87E",
  active: false,
  notification: 1,
  link: "",
  secondary: false,
};

const linkItems4: SideBarLinkProps = {
  title: "Tutoriel",
  icon: <WheelIcon width={20} height={20} />,
  color: "#3961db",
  active: false,
  notification: 0,
  link: "",
  secondary: true,
};

export default {
  title: "Component/SideBar",
  component: SideBar,
} as Meta;

const Template: Story = () => {
  return (
    <div>
      <SideBar logo1={items.logo1} alt={items.alt}>
        <SideBarLink
          title={linkItems1.title}
          icon={linkItems1.icon}
          color={linkItems1.color}
          active={linkItems1.active}
          notification={linkItems1.notification}
          link={linkItems1.link}
          secondary={linkItems1.secondary}
        />
        <SideBarLink
          title={linkItems2.title}
          icon={linkItems2.icon}
          color={linkItems2.color}
          active={linkItems2.active}
          notification={linkItems2.notification}
          link={linkItems2.link}
          secondary={linkItems2.secondary}
        />
        <SideBarLink
          title={linkItems3.title}
          icon={linkItems3.icon}
          color={linkItems3.color}
          active={linkItems3.active}
          notification={linkItems3.notification}
          link={linkItems3.link}
          secondary={linkItems3.secondary}
        />
        <SideBarLink
          title={linkItems4.title}
          icon={linkItems4.icon}
          color={linkItems4.color}
          active={linkItems4.active}
          notification={linkItems4.notification}
          link={linkItems4.link}
          secondary={linkItems4.secondary}
        />
      </SideBar>
    </div>
  );
};

export const SideBarExample = Template.bind({});
