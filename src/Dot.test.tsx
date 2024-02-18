import React from 'react';
import renderer from 'react-test-renderer';
import { Dot } from '.';

describe('Dot', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Dot width={30} />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
