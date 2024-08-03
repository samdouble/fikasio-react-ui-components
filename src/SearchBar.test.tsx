import React from 'react';
import { render } from '@testing-library/react';
import { SearchBar } from '.';

describe('SearchBar', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<SearchBar />);
    expect(baseElement).toMatchSnapshot();
  });
});
