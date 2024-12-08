import React from 'react';
import Dot, { DotProps } from '../components/Dot/Dot';

const story = {
  title: 'Dot',
  component: Dot,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({ className, color, size, style }: DotProps) {
  return (
    <Dot className={className} color={color} size={size} style={style} />
  );
}

export const DotRedWith30 = Template.bind({});
DotRedWith30.args = {
  color: 'red',
  size: 30,
};

export default story;
