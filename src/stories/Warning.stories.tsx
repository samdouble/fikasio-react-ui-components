import type { Meta, StoryObj } from '@storybook/react-vite';
import Warning from '../components/Warning/Warning';

const meta = {
  title: 'Warning',
  component: Warning,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Warning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WarningNoStyle: Story = {
  args: {
    children: 'Warning',
  },
};
