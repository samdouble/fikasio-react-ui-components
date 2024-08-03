import React from 'react';
import { render } from '@testing-library/react';
import { Table } from '.';

describe('Table', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Table />,
    );
    console.log(baseElement);
    expect(baseElement).toMatchSnapshot();
  });
});
