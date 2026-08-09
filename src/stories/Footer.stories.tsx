import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from '../components/Footer/Footer';

const meta = {
  title: 'Footer',
  component: Footer,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FooterNoStyle: Story = {
  args: {
    childrenLeft: [<div key="1">Child 1</div>],
    childrenCenter: [<div key="2">Child 2</div>],
    childrenRight: [<div key="3">Child 3</div>],
    childrenTop: [<div key="4">Child 4</div>],
  },
};
