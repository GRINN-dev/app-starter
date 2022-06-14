import React, { FC, useState } from "react";
import { Typography } from "../Typography";
import { ToolTipProps } from "./";

export const ToolTip: FC<ToolTipProps> = ({ icon, position, children }) => {
  const [isHover, setIsHover] = useState(false);
  const Icon = icon;
  return (
    <div
      className="relative inline cursor-help"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Icon className="inline w-6 h-6" />
      {isHover && (
        <Typography
          as="div"
          size="xs"
          className={`absolute ${
            position === "TOP"
              ? "bottom-6"
              : position === "LEFT"
              ? "right-4 -bottom-3"
              : position === "RIGHT"
              ? "left-4 -bottom-3"
              : ""
          } bg-white border rounded-md p-2`}
        >
          {children}
        </Typography>
      )}
    </div>
  );
};
