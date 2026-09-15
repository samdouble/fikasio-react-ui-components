import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from '../components/DatePicker/DatePicker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: {
    className: { control: 'text' },
    showMonthDropdown: { control: 'boolean' },
    showYearDropdown: { control: 'boolean' },
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

export const DatePickerOpen: Story = {
  args: {
    defaultValue: new Date('2026-08-31'),
    isOpen: true,
    showTimeSelect: false,
  },
};

export const DatePickerWithMonthAndYearDropdowns: Story = {
  args: {
    defaultValue: new Date('2026-08-31'),
    isOpen: true,
    showMonthDropdown: true,
    showTimeSelect: false,
    showYearDropdown: true,
  },
};
