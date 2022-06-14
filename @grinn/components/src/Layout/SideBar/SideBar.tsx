import { FC, useState } from "react";
import { GrinnIcon, LogoIcon } from "@grinn/icons";

import { SideBarProps } from "./types";
import React from "react";
import { Transition } from "@headlessui/react";

export const SideBarContext = React.createContext<{ collapsed: boolean }>({
  collapsed: false,
});

export const SideBar: FC<SideBarProps> = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <SideBarContext.Provider value={{ collapsed: !isShowing }}>
      <div
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        className={
          "flex flex-col h-full max-w-xl pt-3 bg-white border shadow-xl w-max border-r-gray-200  "
        }
      >
        <div className="flex items-center justify-between px-4 mb-6 ">
          <LogoIcon color="#1b43bd" height={40} width={40} />
          <Transition
            show={isShowing}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 -translate-x-2"
            enterTo="opacity-100  -translate-x-0"
            leave=""
            leaveFrom=""
            leaveTo=""
            className="flex w-full"
          >
            <GrinnIcon
              color="#1b43bd"
              height={40}
              width={80}
              fill="#1b43bd"
              className="ml-4"
            />
          </Transition>
        </div>
        {children}
      </div>
    </SideBarContext.Provider>
  );
};
