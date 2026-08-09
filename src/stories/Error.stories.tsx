import type { Meta, StoryObj } from '@storybook/react-vite';
import Error from '../components/Error/Error';

const meta = {
  title: 'Error',
  component: Error,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorNoStyle: Story = {
  args: {
    children: 'Error',
  },
};
