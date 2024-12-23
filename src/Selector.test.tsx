import React from 'react';
import { render } from '@testing-library/react';
import { Selector } from '.';

describe('Selector', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Selector
        options={['Option 1', 'Option 2', 'Option 3']}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
