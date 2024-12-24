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

function Template({ className, Component, options, style }: SelectorProps) {
  return (
    <Selector
      className={className}
      Component={Component}
      options={options}
      style={style}
    />
  );
}

export const SelectorNoStyle = Template.bind({});
SelectorNoStyle.args = {
  Component: <div>Hello</div>,
  options: ['Option 1', 'Option 2', 'Option 3'],
};

export default story;
