import React from 'react';
import renderer from 'react-test-renderer';
import { Input } from '.';

describe('Input', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Input />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
