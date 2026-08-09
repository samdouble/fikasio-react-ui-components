import type { Meta, StoryObj } from '@storybook/react-vite';
import AutosaveTextarea from '../components/AutosaveTextarea/AutosaveTextarea';

const meta = {
  title: 'AutosaveTextarea',
  component: AutosaveTextarea,
  argTypes: {
    className: { control: 'text' },
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
