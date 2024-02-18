import React from 'react';
import AutosaveTextarea, { AutosaveTextareaProps } from '../components/AutosaveTextarea/AutosaveTextarea';

const story = {
  title: 'AutosaveTextarea',
  component: AutosaveTextarea,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  defaultValue,
  onBlur,
  onFocus,
  onKeyDown,
  onKeyUp,
  onSave,
  ref,
  style,
  useContentEditableDiv,
}: AutosaveTextareaProps) {
  return (
    <AutosaveTextarea
      className={className}
      defaultValue={defaultValue}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onSave={onSave}
      ref={ref}
      style={style}
      useContentEditableDiv={useContentEditableDiv}
    />
  );
}

export const AutosaveTextareaNoStyle = Template.bind({});
AutosaveTextareaNoStyle.args = {
  onSave: async () => await new Promise(resolve => setTimeout(resolve, 150)),
  useContentEditableDiv: true,
};

export default story;
