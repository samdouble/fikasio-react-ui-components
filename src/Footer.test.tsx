import React from 'react';
import renderer from 'react-test-renderer';
import { Footer } from '.';

describe('Footer', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Footer />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
