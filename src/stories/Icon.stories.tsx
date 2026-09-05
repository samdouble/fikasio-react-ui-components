import type { Meta, StoryObj } from '@storybook/react-vite';
import Icon from '../components/Icon/Icon';

const meta = {
  title: 'Icon',
  component: Icon,
  argTypes: {
    className: { control: 'text' },
    name: {
      control: 'select',
      options: [
        'archive',
        'bars',
        'bell',
        'book',
        'bullseye',
        'calendar-alt',
        'caret-left',
        'caret-right',
        'check',
        'check-square',
        'clock',
        'cog',
        'copy',
        'download',
        'edit',
        'ellipsis',
        'list',
        'magnifying-glass',
        'message',
        'plus',
        'power-off',
        'project-diagram',
        'shapes',
        'sitemap',
        'sliders',
        'stopwatch',
        'th',
        'times',
        'user',
      ],
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

export const Archive: Story = {
  args: {
    name: 'archive',
  },
};

export const Bars: Story = {
  args: {
    name: 'bars',
  },
};

export const Bell: Story = {
  args: {
    name: 'bell',
  },
};

export const Book: Story = {
  args: {
    name: 'book',
  },
};

export const Bullseye: Story = {
  args: {
    name: 'bullseye',
  },
};

export const CalendarAlt: Story = {
  args: {
    name: 'calendar-alt',
  },
};

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

export const Check: Story = {
  args: {
    name: 'check',
  },
};

export const CheckSquare: Story = {
  args: {
    name: 'check-square',
  },
};

export const Clock: Story = {
  args: {
    name: 'clock',
  },
};

export const Cog: Story = {
  args: {
    name: 'cog',
  },
};

export const Copy: Story = {
  args: {
    name: 'copy',
  },
};

export const Download: Story = {
  args: {
    name: 'download',
  },
};

export const Edit: Story = {
  args: {
    name: 'edit',
  },
};

export const Ellipsis: Story = {
  args: {
    name: 'ellipsis',
  },
};

export const List: Story = {
  args: {
    name: 'list',
  },
};

export const MagnifyingGlass: Story = {
  args: {
    name: 'magnifying-glass',
  },
};

export const Message: Story = {
  args: {
    name: 'message',
  },
};

export const Plus: Story = {
  args: {
    name: 'plus',
  },
};

export const PowerOff: Story = {
  args: {
    name: 'power-off',
  },
};

export const ProjectDiagram: Story = {
  args: {
    name: 'project-diagram',
  },
};

export const Shapes: Story = {
  args: {
    name: 'shapes',
  },
};

export const Sitemap: Story = {
  args: {
    name: 'sitemap',
  },
};

export const Sliders: Story = {
  args: {
    name: 'sliders',
  },
};

export const Stopwatch: Story = {
  args: {
    name: 'stopwatch',
  },
};

export const Th: Story = {
  args: {
    name: 'th',
  },
};

export const Times: Story = {
  args: {
    name: 'times',
  },
};

export const User: Story = {
  args: {
    name: 'user',
  },
};
