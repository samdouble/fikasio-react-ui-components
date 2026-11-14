import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Button.Action>
        Click me
      </Button.Action>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Uses the given type and accessible name', () => {
    const { getByRole } = render(
      <Button.Action
        ariaLabel="Close"
        type="button"
      >
        x
      </Button.Action>,
    );
    const button = getByRole('button', { name: 'Close' });
    expect(button.getAttribute('type')).toBe('button');
  });
});
