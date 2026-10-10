import type { Meta, StoryObj } from '@storybook/react-vite';
import Table from '../components/Table/Table';

const meta = {
  title: 'Table',
  component: Table,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithChildren: Story = {
  args: {
    bordered: true,
    children: (
      <>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Project A</td>
            <td>Active</td>
          </tr>
        </tbody>
      </>
    ),
    hover: true,
    responsive: true,
  },
};
