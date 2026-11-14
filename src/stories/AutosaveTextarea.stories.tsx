import type { Meta, StoryObj } from '@storybook/react-vite';
import AutosaveTextarea from '../components/AutosaveTextarea/AutosaveTextarea';

const meta = {
  title: 'AutosaveTextarea',
  component: AutosaveTextarea,
  argTypes: {
    autoResize: { control: 'boolean' },
    className: { control: 'text' },
    maxRows: { control: 'number' },
    minRows: { control: 'number' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof AutosaveTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AutosaveTextareaNoStyle: Story = {
  args: {
    onSave: async (_value: string) => new Promise(resolve => {
      setTimeout(resolve, 150);
    }),
  },
};

export const AutosaveTextareaAutosize: Story = {
  args: {
    autoResize: true,
    defaultValue: 'This note grows as you type.',
    onSave: () => undefined,
    style: { width: 240 },
  },
};
