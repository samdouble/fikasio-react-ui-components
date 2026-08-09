import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '../components/Input/Input';

const meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputUnchecked: Story = {
  args: {},
};
