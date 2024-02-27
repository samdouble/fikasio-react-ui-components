import React from 'react';
import renderer from 'react-test-renderer';
import { Table } from '.';

describe('Table', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Table />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
