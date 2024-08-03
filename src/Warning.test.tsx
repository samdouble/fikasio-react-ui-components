import React from 'react';
import { render } from '@testing-library/react';
import { Warning } from '.';

describe('Warning', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Warning>
        This is a warning
      </Warning>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
