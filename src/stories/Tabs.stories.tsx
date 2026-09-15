import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from '../components/Tabs/Tabs';

const meta = {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsWithContent: Story = {
  args: {
    defaultValue: 'overview',
    options: [
      {
        content: 'Overview of the current workspace.',
        label: 'Overview',
        value: 'overview',
      },
      {
        content: 'Additional details and metadata.',
        label: 'Details',
        value: 'details',
      },
      {
        content: 'Workspace settings.',
        label: 'Settings',
        value: 'settings',
      },
    ],
  },
};

export const TabsWithDisabledOption: Story = {
  args: {
    options: [
      {
        content: 'Overview of the current workspace.',
        label: 'Overview',
        value: 'overview',
      },
      {
        content: 'Additional details and metadata.',
        disabled: true,
        label: 'Details',
        value: 'details',
      },
      {
        content: 'Workspace settings.',
        label: 'Settings',
        value: 'settings',
      },
    ],
  },
};
