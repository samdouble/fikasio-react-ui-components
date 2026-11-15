import type { Meta, StoryObj } from '@storybook/react-vite';
import OtpInput from '../components/OtpInput/OtpInput';

const meta = {
  title: 'OtpInput',
  component: OtpInput,
  argTypes: {
    autoFocus: { control: 'boolean' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    name: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OtpInputEmpty: Story = {
  args: {
    onChange: () => undefined,
    value: '',
  },
};

export const OtpInputFilled: Story = {
  args: {
    onChange: () => undefined,
    value: 'AB12CD',
  },
};
