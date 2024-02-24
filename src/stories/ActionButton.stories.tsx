import React from 'react';
import Button from '../components/Button/Button';
import { ActionButtonProps } from '../components/Button/ActionButton';

const story = {
  title: 'ActionButton',
  component: Button.Action,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  style,
}: ActionButtonProps) {
  return (
    <Button.Action
      className={className}
      style={style}
    />
  );
}

export const ActionButtonNoStyle = Template.bind({});
ActionButtonNoStyle.args = {};

export default story;
