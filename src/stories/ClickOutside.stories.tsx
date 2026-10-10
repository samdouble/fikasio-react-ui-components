import type { Meta, StoryObj } from '@storybook/react-vite';
import ClickOutside from '../components/ClickOutside/ClickOutside';

const meta = {
  title: 'ClickOutside',
  component: ClickOutside,
} satisfies Meta<typeof ClickOutside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click outside this box',
    onClickOutside: () => undefined,
  },
};
