import React from 'react';
import { render } from '@testing-library/react';
import { Selector } from '.';

describe('Selector', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Selector />);
    expect(baseElement).toMatchSnapshot();
  });
});
