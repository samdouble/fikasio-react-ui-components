import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table } from '.';

describe('Table', () => {
  it('Renders its children inside a responsive table', () => {
    const { container } = render(
      <Table
        bordered
        hover
        responsive
      >
        <tbody>
          <tr>
            <td>Alpha</td>
          </tr>
        </tbody>
      </Table>,
    );

    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(container.querySelector('.fikasio-table-responsive')).not.toBeNull();
    const table = container.querySelector('table');
    expect(table?.classList.contains('fikasio-content-table')).toBe(true);
    expect(table?.classList.contains('fikasio-content-table-bordered')).toBe(true);
    expect(table?.classList.contains('fikasio-content-table-hover')).toBe(true);
  });
});
