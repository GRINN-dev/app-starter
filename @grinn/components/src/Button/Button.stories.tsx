import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from ".";
import {
  DownloadIcon,
  CalendarIcon,
  PrintIcon,
  ExclamationIcon,
} from "@grinn/icons";

export default {
  title: "Component/Button",
  component: Button,
} as Meta;

const outlinedPrimaryValues: ButtonProps = {
  label: "type outlined",
  variant: "OUTLINED",
  color: "PRIMARY",
};

const outlinedSecondaryValues: ButtonProps = {
  label: "type outlined",
  variant: "OUTLINED",
  color: "SECONDARY",
};

const outlinedAccentValues: ButtonProps = {
  label: "type outlined",
  variant: "OUTLINED",
  color: "ACCENT",
};

const filledPrimaryValues: ButtonProps = {
  label: "type filled",
  variant: "FILLED",
  color: "PRIMARY",
};

const filledSecondaryValues: ButtonProps = {
  label: "type filled",
  variant: "FILLED",
  color: "SECONDARY",
};

const filledAccentValues: ButtonProps = {
  label: "type filled",
  variant: "FILLED",
  color: "ACCENT",
};

const filledWhiteValues: ButtonProps = {
  label: "type filled",
  variant: "FILLED",
  color: "WHITE",
};

const linkPrimaryValues: ButtonProps = {
  label: "type link",
  variant: "LINK",
  color: "PRIMARY",
};

const linkSecondaryValues: ButtonProps = {
  label: "type link",
  variant: "LINK",
  color: "SECONDARY",
};

const linkAccentValues: ButtonProps = {
  label: "type link",
  variant: "LINK",
  color: "ACCENT",
};

const outlinedPrimaryWithPrefixIconValues: ButtonProps = {
  label: "type outlined with prefix icon",
  variant: "OUTLINED",
  color: "PRIMARY",
  prefixIcon: <DownloadIcon className="w-6 h-6" />,
};

const filledSecondaryWithSuffixIconValues: ButtonProps = {
  label: "type filled with suffix icon",
  variant: "FILLED",
  color: "SECONDARY",
  suffixIcon: <ExclamationIcon className="w-6 h-6" />,
};

const linkAccentWithPrefixIconValues: ButtonProps = {
  label: "type link with prefix icon",
  variant: "LINK",
  color: "ACCENT",
  prefixIcon: <CalendarIcon className="w-6 h-6" />,
};

const filledIconOnlyValues: ButtonProps = {
  variant: "FILLED",
  color: "WHITE",
  prefixIcon: <PrintIcon className="w-10 h-10" />,
};

const Template: Story<ButtonProps> = _args => {
  return (
    <div className="flex h-screen space-x-8 bg-gray-50">
      <div className="flex flex-col items-center space-y-2">
        <Button {...outlinedPrimaryValues} />
        <Button {...outlinedPrimaryValues} disabled />
        <Button {...outlinedSecondaryValues} />
        <Button {...outlinedAccentValues} />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Button {...filledPrimaryValues} />
        <Button {...filledPrimaryValues} disabled />
        <Button {...filledSecondaryValues} />
        <Button {...filledAccentValues} />
        <Button {...filledWhiteValues} />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Button {...linkPrimaryValues} />
        <Button {...linkSecondaryValues} />
        <Button {...linkAccentValues} />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Button {...outlinedPrimaryWithPrefixIconValues} />
        <Button {...filledSecondaryWithSuffixIconValues} />
        <Button {...linkAccentWithPrefixIconValues} />
        <Button {...filledIconOnlyValues} />
      </div>
    </div>
  );
};

export const ButtonExemple = Template.bind({});
