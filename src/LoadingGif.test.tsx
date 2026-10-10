import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingGif } from '.';

describe('LoadingGif', () => {
  it('Renders a loading image', () => {
    render(<LoadingGif />);
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });
});
