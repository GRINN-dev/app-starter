import { Meta, Story } from "@storybook/react";
import { Card } from "./Card";
import { CardProps } from "./types";

const cards: CardProps = {
  image:
    "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
  alt: "card-background",
};

export default {
  title: "Component/Cards",
  component: Card,
} as Meta;

const Template: Story = () => {
  return (
    <div>
      <Card image={cards.image} alt={cards.alt}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas illum
        sequi magnam blanditiis assumenda? Sunt nobis cumque quasi commodi,
        nulla ipsam ea incidunt placeat expedita unde voluptatum officia,
        aliquam omnis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Cumque, nam vitae maiores natus labore, eos quibusdam, id repudiandae
        itaque incidunt eveniet! Numquam officia officiis repudiandae sint
        reiciendis, porro eaque corporis!Lorem Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Earum eum eius aliquam cupiditate.
        Voluptas debitis officia aut quisquam, esse corrupti aperiam veniam!
        Similique sunt esse earum magnam nam unde non. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Dolorem, quae! Debitis autem possimus
        enim! Quasi officia ipsum quibusdam assumenda, modi necessitatibus.
        Quasi, accusantium accusamus maiores ad explicabo quibusdam iusto
        perferendis! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Fuga esse ipsum magni voluptatibus tempora placeat distinctio eaque
        cumque. Vitae odio maxime dignissimos nulla libero iure et a voluptates
        exercitationem corrupti.
      </Card>
    </div>
  );
};

export const CardsExample = Template.bind({});
