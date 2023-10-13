import React from 'react';
import renderer from 'react-test-renderer';
import { DatePicker } from '.';

describe('DatePicker', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<DatePicker />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
