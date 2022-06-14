import { Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { FC } from "react";

export const PageTransition: FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [isShowing, setIsShowing] = React.useState(false);
  useEffect(() => {
    setIsShowing(true);
  }, []);
  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-700 ease-in"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="relative">{children}</div>
    </Transition>
  );
};
