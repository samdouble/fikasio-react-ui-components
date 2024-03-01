import React from 'react';
import DropdownOptions, { DropdownOptionsProps } from '../components/DropdownOptions/DropdownOptions';

const story = {
  title: 'DropdownOptions',
  component: DropdownOptions,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  options,
  style,
}: DropdownOptionsProps) {
  return (
    <DropdownOptions
      className={className}
      options={options}
      style={style}
    />
  );
}

export const DropdownOptionsUnchecked = Template.bind({});
DropdownOptionsUnchecked.args = {
  options: [{
    label: 'Delete',
    onClick: () => console.info('delete'),
    type: 'delete',
  }],
};

export default story;
