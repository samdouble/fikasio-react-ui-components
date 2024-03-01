import React from 'react';
import renderer from 'react-test-renderer';
import { DropdownOptions } from '.';

describe('DropdownOptions', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<DropdownOptions />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
