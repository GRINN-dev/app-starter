import { FC } from "react";
//import ReactSpeedometer from "react-d3-speedometer";
import { SpeedometerProps } from "./types";

export const Speedometer: FC<SpeedometerProps> = ({
  segments,
  width,
  height,
  minValue,
  maxValue,
  value,
  customSegmentLabels,
  segmentColors,
  maxSegmentLabels,
  textColor,
  forceRender,
  ringWidth,
  needleColor,
  needleHeightRatio,
  customSegmentStops,
}) => {
  return (
    <div className="">
      {/* <ReactSpeedometer
        segments={segments}
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        customSegmentLabels={customSegmentLabels}
        segmentColors={segmentColors}
        maxSegmentLabels={maxSegmentLabels}
        textColor={textColor}
        forceRender={forceRender}
        width={width}
        height={height}
        ringWidth={ringWidth}
        needleColor={needleColor}
        needleHeightRatio={needleHeightRatio}
        currentValueText={`${value}`} // mais pas sur la maquette
      />
      <style>
        {`text.segment-value:nth-child(1) {
        transform: rotate(0deg) translate(-105px, -15px)}`}

        {`text.segment-value:nth-child(2) {
        transform: rotate(0deg) translate(-65px, -80px)}`}

        {`text.segment-value:nth-child(4) {
        transform: rotate(0deg) translate(65px, -80px)}`}

        {`text.segment-value:last-child {
        transform: rotate(0deg) translate(100px, -15px)};`}
      </style> */}
    </div>
  );
};
