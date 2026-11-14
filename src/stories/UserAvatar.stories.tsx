import type { Meta, StoryObj } from '@storybook/react-vite';
import UserAvatar from '../components/UserAvatar/UserAvatar';

const meta = {
  title: 'UserAvatar',
  component: UserAvatar,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserAvatarDefault: Story = {
  args: {
    size: 72,
  },
};
