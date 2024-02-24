import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '.';

describe('Button', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Button.Action />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
