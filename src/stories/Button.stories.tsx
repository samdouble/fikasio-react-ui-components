import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '../components/Button/Button';

const meta = {
  title: 'Button',
  component: Button.Action,
} satisfies Meta<typeof Button.Action>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  args: {
    children: 'Save',
  },
  render: () => (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
      <Button.Action type="button">Save</Button.Action>
      <Button.Success type="button">Save</Button.Success>
      <Button.Danger type="button">Delete</Button.Danger>
      <Button.Secondary type="button">Cancel</Button.Secondary>
      <Button.Secondary active type="button">List</Button.Secondary>
      <Button.Danger outline size="sm" type="button">Remove</Button.Danger>
      <Button.Link type="button">Resend</Button.Link>
    </div>
  ),
};
