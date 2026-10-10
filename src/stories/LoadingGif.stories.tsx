import type { Meta, StoryObj } from '@storybook/react-vite';
import LoadingGif from '../components/LoadingGif/LoadingGif';

const meta = {
  title: 'LoadingGif',
  component: LoadingGif,
} satisfies Meta<typeof LoadingGif>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingGifDefault: Story = {};
