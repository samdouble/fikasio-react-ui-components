import React from 'react';
import { render } from '@testing-library/react';
import { DatePicker } from '.';

describe('DatePicker', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<DatePicker />);
    expect(baseElement).toMatchSnapshot();
  });
});
