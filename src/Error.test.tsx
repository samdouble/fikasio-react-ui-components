import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { Error } from '.';

describe('Error', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Error>
        This is an error
      </Error>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
