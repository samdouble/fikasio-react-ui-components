import React from 'react';
import Selector, { SelectorProps } from '../components/Selector/Selector';

const story = {
  title: 'Selector',
  component: Selector,
  argTypes: {
    className: { control: 'text' },
    options: { control: 'array' },
    style: { control: 'object' },
  },
};

function Template({ className, options, render, style }: SelectorProps) {
  return (
    <Selector
      className={className}
      options={options}
      render={render}
      style={style}
    />
  );
}

export const SelectorNoStyle = Template.bind({});
SelectorNoStyle.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  render: (value: string) => <div>Hello {value}</div>,
};

export default story;
