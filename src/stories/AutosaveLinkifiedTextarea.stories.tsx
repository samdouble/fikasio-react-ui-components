import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import AutosaveLinkifiedTextarea from '../components/AutosaveLinkifiedTextarea/AutosaveLinkifiedTextarea';

const meta = {
  title: 'AutosaveLinkifiedTextarea',
  component: AutosaveLinkifiedTextarea,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof AutosaveLinkifiedTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

function AutosaveLinkifiedTextareaStory({
  onChange,
  value = '',
  ...args
}: React.ComponentProps<typeof AutosaveLinkifiedTextarea>) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <AutosaveLinkifiedTextarea
      {...args}
      onChange={event => {
        setText(event.target.value);
        onChange(event);
      }}
      value={text}
    />
  );
}

export const AutosaveLinkifiedTextareaWithLink: Story = {
  args: {
    onChange: () => undefined,
    onSave: () => undefined,
    value: 'See https://fikas.io/docs',
  },
  render: args => <AutosaveLinkifiedTextareaStory {...args} />,
};
