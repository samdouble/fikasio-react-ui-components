import React from 'react';
import { render } from '@testing-library/react';
import { Select } from '.';

describe('Select', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Select />);
    expect(baseElement).toMatchSnapshot();
  });
});
