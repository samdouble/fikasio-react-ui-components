import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '../components/Input/Input';

const meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    className: { control: 'text' },
    delay: { control: 'number' },
    multiline: { control: 'boolean' },
    placeholder: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputDefault: Story = {
  args: {
    defaultValue: 'Task name',
    onSave: () => undefined,
    placeholder: 'Name',
  },
};

export const InputMultiline: Story = {
  args: {
    defaultValue: 'A short note',
    multiline: true,
    onSave: () => undefined,
  },
};
