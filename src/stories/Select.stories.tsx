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
  defaultValue,
  onChange,
  options,
  style,
  value,
}: SelectProps) {
  return (
    <Select
      className={className}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      style={style}
      value={value}
    />
  );
}

export const SelectNoStyle = Template.bind({});
SelectNoStyle.args = {};

export default story;
