import React from 'react';
import Table, { TableProps } from '../components/Table/Table';

const story = {
  title: 'Table',
  component: Table,
  argTypes: {
    className: { control: 'text' },
    style: { control: 'object' },
  },
};

function Template({
  className,
  columns,
  options,
  rows,
  style,
}: TableProps) {
  return (
    <Table
      className={className}
      columns={columns}
      options={options}
      rows={rows}
      style={style}
    />
  );
}

export const TableNoStyle = Template.bind({});
TableNoStyle.args = {
  columns: [
    {
      name: 'Last name',
      render: r => r.lastName,
      sortable: true,
      type: 'cell',
    }, {
      name: 'First name',
      render: r => r.firstName,
      sortable: true,
      type: 'cell',
    },
  ],
  rows: [{
    lastName: 'Whittom',
    firstName: 'Samuel',
  }],
};

export default story;
