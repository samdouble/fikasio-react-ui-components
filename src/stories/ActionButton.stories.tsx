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
  children,
  className,
  onClick,
  style,
  type,
}: ActionButtonProps) {
  return (
    <Button.Action
      className={className}
      onClick={onClick}
      style={style}
      type={type}
    >
      {children}
    </Button.Action>
  );
}

export const ActionButtonNoStyle = Template.bind({});
ActionButtonNoStyle.args = {
  children: 'Click me',
};

export default story;
