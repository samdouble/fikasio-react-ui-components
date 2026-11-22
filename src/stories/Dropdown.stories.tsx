import type { Meta, StoryObj } from '@storybook/react-vite';
import Dropdown from '../components/Dropdown/Dropdown';

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    autoClose: {
      control: 'select',
      options: [true, false, 'inside', 'outside'],
    },
    className: { control: 'text' },
    show: { control: 'boolean' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenMenu: Story = {
  args: {
    children: null,
    show: true,
  },
  render: args => (
    <Dropdown {...args}>
      <Dropdown.Toggle>Actions</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item active>Duplicate</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};
