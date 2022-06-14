import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { RadioButton, RadioButtonProps } from './RadioButton';

export default {
  title: 'Component/RadioButton',
  component: RadioButton,
} as Meta;

const valueItems: RadioButtonProps = {
  values: [
    { key: 'locataire ?', value: 'locataire ?' },
    { key: 'propriétaire ?', value: 'propriétaire ?' },
  ],
};

const Template: Story<RadioButtonProps> = () => {
  return (
    <div>
      <RadioButton {...valueItems} />
    </div>
  );
};

export const RadioButtonExemple = Template.bind({});
