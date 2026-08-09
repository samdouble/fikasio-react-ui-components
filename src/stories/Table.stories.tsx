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

export const TableNoStyle: Story = {
  args: {
    columns: [
      {
        isSortable: true,
        name: 'Last name',
        property: 'lastName',
        render: row => row.lastName as React.ReactNode,
        type: 'cell',
        value: row => String(row.lastName ?? ''),
      },
      {
        isSortable: true,
        name: 'First name',
        property: 'firstName',
        render: row => row.firstName as React.ReactNode,
        type: 'cell',
        value: row => String(row.firstName ?? ''),
      },
    ],
    rows: [
      {
        lastName: 'Smith',
        firstName: 'Bob',
      },
    ],
  },
};
