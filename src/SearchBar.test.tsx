import React from 'react';
import renderer from 'react-test-renderer';
import { SearchBar } from '.';

describe('SearchBar', () => {
  it('Renders correctly', () => {
    const componentJSON = renderer.create(<SearchBar />).toJSON();
    expect(componentJSON).toMatchSnapshot();
  });
});
