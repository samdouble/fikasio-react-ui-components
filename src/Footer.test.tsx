import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '.';

describe('Footer', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toMatchSnapshot();
  });
});
