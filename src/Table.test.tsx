import React from 'react';
import { render } from '@testing-library/react';
import { Table } from '.';

describe('Table', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Table />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
