import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Button.Action>
        Click me
      </Button.Action>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
