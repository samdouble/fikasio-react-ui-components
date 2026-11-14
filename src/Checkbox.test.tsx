import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Checkbox } from '.';

describe('Checkbox', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Checkbox />);
    expect(baseElement).toMatchSnapshot();
  });
});
