import { FC } from "react";
import { TypographyProps } from "./types";

export const Typography: FC<TypographyProps> = ({
  as: Tag = "span",
  weight = "normal",
  color = undefined,
  children,
  size = "md",
  tracking = "normal",
  uppercase = false,
  underline = false,
  textAlign = "start",
  lineThrough = false,
  lineHeight = "none",
  className = null,
  id,
  ...rest
}) => {
  return (
    <Tag
      className={`${
        weight === "bold" ? "font-ApfelGrotezkFett" : "font-ApfelGrotezk"
      } ${
        size === "xs"
          ? "text-xs"
          : size === "sm"
          ? "text-sm"
          : size === "md"
          ? "text-base"
          : size === "lg"
          ? "text-lg"
          : size === "xl"
          ? "text-xl"
          : size === "2xl"
          ? "text-2xl"
          : size === "3xl"
          ? "text-3xl"
          : size === "4xl"
          ? "text-4xl"
          : size === "5xl"
          ? "text-5xl"
          : size === "6xl"
          ? "text-6xl"
          : size === "7xl"
          ? "text-7xl"
          : size === "8xl"
          ? "text-8xl"
          : size === "9xl"
          ? "text-9xl"
          : "text-base"
      } ${
        color === "primary"
          ? "text-primary-500"
          : color === "secondary"
          ? "text-secondary-500"
          : color === "accent"
          ? "text-accent-500"
          : color === "black"
          ? "text-black"
          : "text-gray-700"
      } ${underline && "underline"} ${uppercase && "uppercase"} ${
        lineThrough && "line-through"
      } ${
        lineHeight === "none"
          ? "leading-none"
          : lineHeight === "sm"
          ? "leading-tight"
          : lineHeight === "md"
          ? "leading-normal"
          : lineHeight === "lg"
          ? "leading-5"
          : lineHeight === "xl"
          ? "leading-8"
          : "leading-10"
      } ${tracking === "normal" ? "tracking-normal" : "tracking-wider"} ${
        className === "className" ? "className" : null
      } ${
        textAlign === "center"
          ? "text-center"
          : textAlign === "end"
          ? "text-end"
          : "text-start"
      } ${className}`}
      id={id}
      {...rest}
    >
      {children}
    </Tag>
  );
};
