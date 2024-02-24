import React from 'react';
import Select, { SelectProps } from '../components/Select/Select';

const story = {
  title: 'Select',
  component: Select,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  options,
  style,
}: SelectProps) {
  return (
    <Select
      className={className}
      options={options}
      style={style}
    />
  );
}

export const SelectNoStyle = Template.bind({});
SelectNoStyle.args = {};

export default story;
