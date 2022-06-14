import { Meta, Story } from "@storybook/react";

import { Speedometer } from "./Speedometer";
import { SpeedometerProps } from "./types";

export default {
  title: "Component/Speedometer",
  component: Speedometer,
} as Meta;

const Template: Story<SpeedometerProps> = () => {
  return (
    <div>
      <Speedometer
        value={700}
        customSegmentLabels={[
          { text: "Très faible", fontSize: "12", color: "#ffffff" },
          { text: "Moyen", fontSize: "12", color: "#ffffff" },
          { text: "Bon", fontSize: "12", color: "#ffffff" },
          { text: "Très bon", fontSize: "12", color: "#ffffff" },
          { text: "Exceptionnel", fontSize: "12", color: "#ffffff" },
        ]}
        minValue={300}
        maxValue={850}
        textColor={"#000000"}
        segmentColors={["#EE4840", "#F68941", "#FFCA43", "#A4C446", "#43C044"]}
        maxSegmentLabels={5}
        segments={5}
        forceRender={true}
        width={400}
        height={700}
        ringWidth={130}
        needleColor={"#1B43BD"}
        needleHeightRatio={0.5}
      />
    </div>
  );
};

export const SpeedometerExemple = Template.bind({});
