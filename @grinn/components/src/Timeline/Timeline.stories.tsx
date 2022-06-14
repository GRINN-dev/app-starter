import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { CheckIcon } from "@grinn/icons";
import { Timeline } from "./Timeline";
import { TimelineProps } from "./types";

export default {
  title: "Component/Timeline",
  component: Timeline,
} as Meta;

const timelineSteps: TimelineProps = {
  steps: [
    {
      title: "Questionnaire",
      icon: <CheckIcon />,
      completed: true,
      active: false,
    },
    {
      title: "Compléter mes documents",
      icon: <CheckIcon />,
      completed: false,
      active: true,
    },
    {
      title: "Lancez la consultation",
      icon: <CheckIcon />,
      completed: false,
      active: false,
    },
    {
      title: "Choisissez une proposition",
      icon: <CheckIcon />,
      completed: false,
      active: false,
    },
    {
      title: "Rdv avec la banque",
      icon: <CheckIcon />,
      completed: false,
      active: false,
    },
    {
      title: "Obtenez votre prêt",
      icon: <CheckIcon />,
      completed: false,
      active: false,
    },
  ],
  step: [6, 1],
};

const Template: Story = () => {
  return (
    <div>
      <Timeline {...timelineSteps} />
    </div>
  );
};

export const TimelineExemple = Template.bind({});
