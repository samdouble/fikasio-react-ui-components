import React from 'react';
import renderer from 'react-test-renderer';
import { Select } from '.';

describe('Select', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Select />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
