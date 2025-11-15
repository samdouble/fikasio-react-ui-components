import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '.';

describe('Footer', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Renders correctly with children', () => {
    const { baseElement } = render(<Footer
      childrenLeft={[<div key="1">Child 1</div>]}
      childrenCenter={[<div key="2">Child 2</div>]}
      childrenRight={[<div key="3">Child 3</div>]}
      childrenTop={[<div key="4">Child 4</div>]}
    />);
    expect(baseElement).toMatchSnapshot();
  });
});
