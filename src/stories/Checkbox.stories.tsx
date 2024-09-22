import React from 'react';
import Checkbox, { CheckboxProps } from '../components/Checkbox/Checkbox';

const story = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  defaultIsChecked,
  isChecked,
  name,
  onClick,
  style,
}: CheckboxProps) {
  return (
    <Checkbox
      className={className}
      defaultIsChecked={defaultIsChecked}
      isChecked={isChecked}
      name={name}
      onClick={onClick}
      style={style}
    />
  );
}

export const CheckboxUnchecked = Template.bind({});
CheckboxUnchecked.args = {};

export const CheckboxChecked = Template.bind({});
CheckboxChecked.args = {
  defaultIsChecked: true,
};

export default story;
