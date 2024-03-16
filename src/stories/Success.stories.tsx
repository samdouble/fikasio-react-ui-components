import React from 'react';
import Success, { SuccessProps } from '../components/Success/Success';

const story = {
  title: 'Success',
  component: Success,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  children,
  className,
  style,
}: SuccessProps) {
  return (
    <Success
      className={className}
      style={style}
    >
      {children}
    </Success>
  );
}

export const SuccessNoStyle = Template.bind({});
SuccessNoStyle.args = {};

export default story;
