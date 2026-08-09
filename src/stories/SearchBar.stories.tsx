import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchBar from '../components/SearchBar/SearchBar';

const meta = {
  title: 'SearchBar',
  component: SearchBar,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchBarNoStyle: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    placeholder: 'Search',
  },
};
