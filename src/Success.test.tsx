import React from 'react';
import { render } from '@testing-library/react';
import { Success } from '.';

describe('Success', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <Success>
        It worked
      </Success>,
    );
    expect(baseElement).toMatchSnapshot();
  });
});
