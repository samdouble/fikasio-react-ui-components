import React from 'react';
import renderer from 'react-test-renderer';
import { Warning } from '.';

describe('Warning', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<Warning />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
