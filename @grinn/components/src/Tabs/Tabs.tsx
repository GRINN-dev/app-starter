import { FC } from "react";
import { TabsProps } from "./";
import { Tab } from "@headlessui/react";

export const Tabs: FC<TabsProps> = ({ tab }) => {
  return (
    <Tab.Group>
      <Tab.List className="mx-2 space-x-4 text-xl text-gray-700 border-b">
        {tab.map((x, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              selected
                ? "border-b-4 border-b-accent-500 px-6 py-2 text-gray-500"
                : "px-6 py-2"
            }
          >
            <span className="flex items-center justify-center gap-2">
              {x.icon && x.icon}
              {x.label}
            </span>
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mx-2 mt-4">
        {tab.map((x, index) => (
          <Tab.Panel key={index}>{x.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
