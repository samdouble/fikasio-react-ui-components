import React from 'react';
import Selector, { SelectorProps } from '../components/Selector/Selector';

const story = {
  title: 'Selector',
  component: Selector,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({ className, style }: SelectorProps) {
  return <Selector className={className} style={style} />;
}

export const SelectorNoStyle = Template.bind({});
SelectorNoStyle.args = {};

export default story;
