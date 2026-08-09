import type { Meta, StoryObj } from '@storybook/react-vite';
import DropdownOptions from '../components/DropdownOptions/DropdownOptions';

const meta = {
  title: 'DropdownOptions',
  component: DropdownOptions,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof DropdownOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownOptionsUnchecked: Story = {
  args: {
    options: [
      {
        label: 'Delete',
        onClick: () => console.info('delete'),
        type: 'delete',
      },
    ],
  },
};
