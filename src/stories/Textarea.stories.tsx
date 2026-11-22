import type { Meta, StoryObj } from '@storybook/react-vite';
import Textarea from '../components/Textarea/Textarea';

const meta = {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
    autoResize: { control: 'boolean' },
    className: { control: 'text' },
    linkify: { control: 'boolean' },
    maxRows: { control: 'number' },
    minRows: { control: 'number' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextareaNoStyle: Story = {
  args: {
    onSave: async (_value: string) => new Promise(resolve => {
      setTimeout(resolve, 150);
    }),
  },
};

export const TextareaAutosize: Story = {
  args: {
    autoResize: true,
    defaultValue: 'This note grows as you type.',
    onSave: () => undefined,
    style: { width: 240 },
  },
};

export const TextareaLinkify: Story = {
  args: {
    defaultValue: 'See https://fikas.io/docs',
    linkify: true,
    onSave: () => undefined,
    style: { width: 320 },
  },
};
