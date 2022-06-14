import { FC, HTMLAttributes } from "react";

export const Container: FC<HTMLAttributes<HTMLOrSVGElement>> = ({
  className,
  children,
}) => {
  return (
    <div className="w-full px-6 lg:px-8">
      <div className={"max-w-5xl mx-auto scroll-m-0 " + className}>
        {children}
      </div>
    </div>
  );
};
