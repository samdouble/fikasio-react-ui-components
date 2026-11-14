import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Dot } from '.';

describe('Dot', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Dot size={30} />);
    expect(baseElement).toMatchSnapshot();
  });
});
