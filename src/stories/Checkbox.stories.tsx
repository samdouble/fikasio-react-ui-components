import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from '../components/Checkbox/Checkbox';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxUnchecked: Story = {
  args: {},
};

export const CheckboxChecked: Story = {
  args: {
    defaultIsChecked: true,
  },
};
