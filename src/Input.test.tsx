import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '.';

describe('Input', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Input />);
    expect(baseElement).toMatchSnapshot();
  });
});
