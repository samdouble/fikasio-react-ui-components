import type { Meta, StoryObj } from '@storybook/react-vite';
import Success from '../components/Success/Success';

const meta = {
  title: 'Success',
  component: Success,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Success>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessNoStyle: Story = {
  args: {
    children: 'Success',
  },
};
