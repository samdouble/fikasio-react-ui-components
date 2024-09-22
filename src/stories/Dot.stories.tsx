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

function Template({ className, color, style, width }: DotProps) {
  return (
    <Dot className={className} color={color} style={style} width={width} />
  );
}

export const DotRedWith30 = Template.bind({});
DotRedWith30.args = {
  color: 'red',
  width: 30,
};

export default story;
