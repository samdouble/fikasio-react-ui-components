import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from '.';

describe('Checkbox', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Checkbox />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
