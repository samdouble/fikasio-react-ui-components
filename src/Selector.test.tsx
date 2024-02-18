import React from 'react';
import renderer from 'react-test-renderer';
import { Selector } from '.';

describe('Selector', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Selector />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
