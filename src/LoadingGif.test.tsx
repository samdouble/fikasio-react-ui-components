import React from 'react';
import { describe, it, expect } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import { LoadingGif } from '.';

describe('LoadingGif', () => {
  it('Renders a loading image', () => {
    render(<LoadingGif />);
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });
});
