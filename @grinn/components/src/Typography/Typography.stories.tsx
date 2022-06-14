import { Meta, Story } from "@storybook/react";
import { TypographyProps } from "./types";
import { Typography } from "./Typography";

export default {
  title: "Component/Typography",
  component: Typography,
} as Meta;

const sizes = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
];

const colors = ["primary", "secondary", "accent", "black"];

const Template: Story<TypographyProps> = () => {
  return (
    <>
      <Typography
        size="5xl"
        weight="bold"
        tracking="wide"
        color="primary"
        uppercase={true}
      >
        Tailles
      </Typography>
      <div className="grid bg-gray-200">
        {sizes.map(size => {
          return (
            <>
              {" "}
              <Typography
                size="sm"
                tracking="wide"
                uppercase={true}
                className="text-gray-500"
              >
                {size}
              </Typography>
              <Typography size={size as any}>
                The quick brown fox jumps over the lazy dog 123456789
              </Typography>
            </>
          );
        })}
      </div>

      <Typography
        size="5xl"
        weight="bold"
        tracking="wide"
        color="primary"
        uppercase={true}
      >
        Couleurs
      </Typography>
      <div className="grid bg-gray-200">
        {colors.map(color => {
          return (
            <>
              {" "}
              <Typography
                size="sm"
                tracking="wide"
                uppercase={true}
                className="text-gray-500"
              >
                {color}
              </Typography>
              <Typography size="xl" color={color as any}>
                The quick brown fox jumps over the lazy dog 123456789
              </Typography>
            </>
          );
        })}
      </div>

      <Typography
        size="5xl"
        weight="bold"
        tracking="wide"
        color="primary"
        uppercase={true}
      >
        decorators
      </Typography>
      <div className="grid bg-gray-200">
        <Typography weight="bold">
          The quick brown fox jumps over the lazy dog 123456789
        </Typography>
        <Typography uppercase={true}>
          The quick brown fox jumps over the lazy dog 123456789{" "}
        </Typography>
        <Typography>
          The quick brown fox jumps over the lazy dog 123456789{" "}
        </Typography>
        <Typography lineThrough={true}>
          The quick brown fox jumps over the lazy dog 123456789{" "}
        </Typography>
        <Typography underline>
          The quick brown fox jumps over the lazy dog 123456789{" "}
        </Typography>
      </div>
    </>
  );
};

export const TypographyExample = Template.bind({});
