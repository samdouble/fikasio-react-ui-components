import React from 'react';
import Error, { ErrorProps } from '../components/Error/Error';

const story = {
  title: 'Error',
  component: Error,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({ children, className, style }: ErrorProps) {
  return (
    <Error className={className} style={style}>
      {children}
    </Error>
  );
}

export const ErrorNoStyle = Template.bind({});
ErrorNoStyle.args = {};

export default story;
