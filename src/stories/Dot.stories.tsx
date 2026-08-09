import type { Meta, StoryObj } from '@storybook/react-vite';
import Dot from '../components/Dot/Dot';

const meta = {
  title: 'Dot',
  component: Dot,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DotRedWith30: Story = {
  args: {
    color: 'red',
    size: 30,
  },
};
