import React from 'react';
import { render } from '@testing-library/react';
import { Warning } from '.';

describe('Warning', () => {
  it('Renders correctly', () => {
    const componentJSON = render(
      <Warning>
        This is a warning
      </Warning>
    );
    expect(componentJSON).toMatchSnapshot();
  });
});
