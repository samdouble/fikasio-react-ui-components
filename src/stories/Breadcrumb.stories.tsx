import type { Meta, StoryObj } from '@storybook/react-vite';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const meta = {
  title: 'Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    className: { control: 'text' },
    separator: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { label: 'Project A' },
    ],
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/projects/a', label: 'Project A' },
      { label: 'Settings' },
    ],
    separator: '>',
  },
};

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => undefined },
      { label: 'Projects', onClick: () => undefined },
      { label: 'Project A' },
    ],
  },
};
