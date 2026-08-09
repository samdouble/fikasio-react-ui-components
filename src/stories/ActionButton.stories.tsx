import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../components/Button/Button';

const meta = {
  title: 'ActionButton',
  component: Button.Action,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Button.Action>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActionButtonNoStyle: Story = {
  args: {
    children: 'Click me',
  },
};
