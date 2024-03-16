import React from 'react';
import renderer from 'react-test-renderer';
import { Success } from '.';

describe('Success', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Success />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
