import Link from "next/link";
import { FC, useContext } from "react";
import { SideBarLinkProps } from "./types";
import { Transition } from "@headlessui/react";
import { SideBarContext } from "../SideBar";

export const SideBarLink: FC<SideBarLinkProps> = ({
  title,
  icon,
  color,
  active,
  notification,
  link,
  secondary,
}) => {
  const { collapsed } = useContext(SideBarContext);
  return (
    <Link href={link}>
      <a
        style={
          active
            ? { borderLeftColor: color }
            : { borderLeftColor: "transparent" }
        }
        className={` ${
          secondary && !active
            ? `${" bg-pink-100 !border-transparent border mt-0 justify-items-end"}}`
            : "bg-white"
        } ${"h-16 flex px-2 py-3 w-full text-primary-500 border border-l-4 border-r-transparent border-y-transparent font-ApfelGrotezk cursor-pointer items-center hover:bg-slate-50 "}`}
      >
        <div style={{ color }} className="ml-3 ">
          {icon}
        </div>

        <Transition
          as="div"
          show={!collapsed}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 -translate-x-2"
          enterTo="opacity-100  -translate-x-0"
          leave=""
          leaveFrom=""
          leaveTo=""
          className="flex w-full"
        >
          <p className="flex-grow w-[200px] ml-4 ">{title}</p>

          <div
            className={
              notification > 0
                ? "w-6 h-6 ml-8 text-white rounded-full bg-primary-500 text-center mr-4 justify-center items-center inline-flex"
                : "hidden"
            }
          >
            {notification}
          </div>
        </Transition>
      </a>
    </Link>
  );
};
