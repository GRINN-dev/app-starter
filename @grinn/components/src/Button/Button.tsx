import { FC, useState } from "react";
import { ButtonProps } from ".";

export const Button: FC<ButtonProps> = ({
  color = "PRIMARY",
  label,
  prefixIcon,
  suffixIcon,
  variant = "FILLED",
  onClick,
  type,
  disabled,
  children,
  className,
  as: Tag = "button",
}) => {
  const outlinedPrimary =
    "bg-white border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white";
  const outlinedSecondary =
    "bg-white border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-primary-500";
  const outlinedAccent =
    "bg-white border-2 border-accent-500 text-primary-500 hover:bg-accent-500 hover:text-primary-500";
  const filledPrimary = "!bg-primary-500 hover:bg-primary-900 text-white";
  const filledSecondary =
    "!bg-secondary-500 hover:bg-secondary-900 text-primary-500";
  const filledAccent = "!bg-accent-500 hover:bg-accent-900 text-primary-500";
  const filledWhite =
    "!bg-white hover:bg-primary-500 text-primary-500 hover:text-white";
  const linkPrimary =
    "text-primary-500 hover:underline hover:underline-offset-4";
  const linkSecondary =
    "text-secondary-500 hover:underline hover:underline-offset-4";
  const linkAccent = "text-accent-500 hover:underline hover:underline-offset-4";

  return (
    <Tag
      className={` ${
        label || children ? "py-2 px-5" : "p-4"
      } text-lg rounded-full font-ApfelGrotezk ${
        variant === "OUTLINED" && color === "PRIMARY" ? outlinedPrimary : ""
      } ${
        variant === "OUTLINED" && color === "SECONDARY" ? outlinedSecondary : ""
      } ${variant === "OUTLINED" && color === "ACCENT" ? outlinedAccent : ""} ${
        variant === "FILLED" && color === "PRIMARY" ? filledPrimary : ""
      } ${
        variant === "FILLED" && color === "SECONDARY" ? filledSecondary : ""
      } ${variant === "FILLED" && color === "ACCENT" ? filledAccent : ""} ${
        variant === "FILLED" && color === "WHITE" ? filledWhite : ""
      } ${variant === "LINK" && color === "PRIMARY" ? linkPrimary : ""} ${
        variant === "LINK" && color === "SECONDARY" ? linkSecondary : ""
      } ${
        variant === "LINK" && color === "ACCENT" ? linkAccent : ""
      } disabled:opacity-50 font-ApfelGrotezkFett cursor-pointer inline-block ${className} `}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <span className="flex items-center justify-center gap-2">
        {prefixIcon && prefixIcon}
        {label || children}
        {suffixIcon && suffixIcon}
      </span>
    </Tag>
  );
};
