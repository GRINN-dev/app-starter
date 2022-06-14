export interface SpeedometerProps {
  segments?: number;
  minValue?: number;
  maxValue?: number;
  value: number;
  customSegmentLabels: { text: string; fontSize: string; color: string }[];
  segmentColors?: string[];
  maxSegmentLabels?: number;
  textColor?: string;
  forceRender?: boolean;
  width: number;
  height: number;
  ringWidth?: number;
  needleColor?: string;
  needleHeightRatio?: number;
  currentValueText?: string;
  customSegmentStops?: number[];
  //   valueFormat?: string;
}
