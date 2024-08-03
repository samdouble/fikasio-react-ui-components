import React from 'react';
import { render } from '@testing-library/react';
import { Checkbox } from '.';

describe('Checkbox', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Checkbox />);
    expect(baseElement).toMatchSnapshot();
  });
});
