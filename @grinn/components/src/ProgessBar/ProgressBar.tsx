import { FC } from "react";
import { ProgressBarProps } from "./types";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { Typography } from "..";

export const ProgressBar: FC<ProgressBarProps> = ({ value, maxValue }) => {
  return (
    <div className="flex items-center space-x-4">
      <Typography
        size="lg"
        uppercase
        tracking="wide"
        className="!text-gray-400"
      >
        timer
      </Typography>
      <div className="w-24 h-24">
        <CircularProgressbarWithChildren
          value={value as number}
          background={false}
          backgroundPadding={0}
          strokeWidth={6}
          styles={buildStyles({
            rotation: 0.9,
            trailColor: "rgb(249 250 251)",
            pathColor: "#6bffdc",
          })}
          maxValue={maxValue as number}
        >
          <Typography size="lg" className="text-center !text-gray-400">
            {value < maxValue ? `${value} jours restants` : "Terminé"}
          </Typography>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};
