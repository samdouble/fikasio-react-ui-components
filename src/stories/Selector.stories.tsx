import type { Meta, StoryObj } from '@storybook/react-vite';
import Selector from '../components/Selector/Selector';

const meta = {
  title: 'Selector',
  component: Selector,
  argTypes: {
    className: { control: 'text' },
    options: { control: 'object' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Selector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectorNoStyle: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    render: (value?: string) => <div>Hello {value}</div>,
  },
};
