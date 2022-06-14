import React from 'react';
import { Meta, Story } from '@storybook/react';
import { NumberInput } from '.';
import { NumberInputProps } from './NumberInput';

export default {
  title: 'Component/NumberInput',
  component: NumberInput,
} as Meta;

const dataItems: NumberInputProps = {
  data: [
    {
      text: 'Pouvez-vous indiquer votre salaire ?',
      placeholder: 'Indiquez ici votre salaire',
    },
  ],
};

const Template: Story = () => {
  return (
    <div>
      <NumberInput {...dataItems} />
    </div>
  );
};

export const NumberInputExample = Template.bind({});
