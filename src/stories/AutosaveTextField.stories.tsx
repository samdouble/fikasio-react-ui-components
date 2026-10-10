import type { Meta, StoryObj } from '@storybook/react-vite';
import AutosaveTextField from '../components/AutosaveTextField/AutosaveTextField';

const meta = {
  title: 'AutosaveTextField',
  component: AutosaveTextField,
  argTypes: {
    className: { control: 'text' },
    delay: { control: 'number' },
    multiline: { control: 'boolean' },
    placeholder: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof AutosaveTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AutosaveTextFieldDefault: Story = {
  args: {
    defaultValue: 'Task name',
    onSave: () => undefined,
    placeholder: 'Name',
  },
};

export const AutosaveTextFieldMultiline: Story = {
  args: {
    defaultValue: 'A short note',
    multiline: true,
    onSave: () => undefined,
  },
};
