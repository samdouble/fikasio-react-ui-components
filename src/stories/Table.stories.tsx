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
  isRowChecked,
  isSelectable,
  onRowClick,
  options,
  rows,
  style,
}: TableProps) {
  return (
    <Table
      className={className}
      columns={columns}
      isRowChecked={isRowChecked}
      isSelectable={isSelectable}
      onRowClick={onRowClick}
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
      isSortable: true,
      name: 'Last name',
      render: r => r.lastName,
      type: 'cell',
    }, {
      isSortable: true,
      name: 'First name',
      render: r => r.firstName,
      type: 'cell',
    },
  ],
  rows: [{
    lastName: 'Whittom',
    firstName: 'Samuel',
  }],
};

export default story;
