import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from '../components/Select/Select';

const meta = {
  title: 'Select',
  component: Select,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectTwoOptions: Story = {
  args: {
    defaultValue: 'B',
    onChange: value => {
      console.info(value);
    },
    options: [
      {
        label: 'A',
        value: 'A',
      },
      {
        label: 'B',
        value: 'B',
      },
    ],
  },
};
