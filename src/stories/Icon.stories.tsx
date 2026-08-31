import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from '../components/Icon/Icon';

const meta = {
  title: 'Icon',
  component: Icon,
  argTypes: {
    className: { control: 'text' },
    name: {
      control: 'select',
      options: ['book', 'calendar-alt', 'caret-left', 'caret-right', 'cog', 'download', 'list', 'power-off', 'sitemap', 'th', 'times', 'user'],
    },
    size: {
      control: 'select',
      options: ['1x', 'lg'],
    },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaretLeft: Story = {
  args: {
    name: 'caret-left',
  },
};

export const CaretRight: Story = {
  args: {
    name: 'caret-right',
  },
};

export const Download: Story = {
  args: {
    name: 'download',
  },
};

export const List: Story = {
  args: {
    name: 'list',
  },
};

export const Th: Story = {
  args: {
    name: 'th',
  },
};

export const CalendarAlt: Story = {
  args: {
    name: 'calendar-alt',
  },
};

export const Times: Story = {
  args: {
    name: 'times',
  },
};

export const Cog: Story = {
  args: {
    name: 'cog',
  },
};

export const User: Story = {
  args: {
    name: 'user',
  },
};

export const Book: Story = {
  args: {
    name: 'book',
  },
};

export const Sitemap: Story = {
  args: {
    name: 'sitemap',
  },
};

export const PowerOff: Story = {
  args: {
    name: 'power-off',
  },
};
