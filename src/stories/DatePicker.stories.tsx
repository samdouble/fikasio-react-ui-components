import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from '../components/DatePicker/DatePicker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DatePickerWithDefaultValue: Story = {
  args: {
    defaultValue: new Date(),
  },
};
