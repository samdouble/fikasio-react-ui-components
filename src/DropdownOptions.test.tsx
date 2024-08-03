import React from 'react';
import { render } from '@testing-library/react';
import { DropdownOptions } from '.';

describe('DropdownOptions', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<DropdownOptions />);
    expect(baseElement).toMatchSnapshot();
  });
});
