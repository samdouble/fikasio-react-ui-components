import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserAvatar } from '.';

describe('UserAvatar', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<UserAvatar />);
    expect(baseElement).toMatchSnapshot();
  });

  it('shows the given picture', () => {
    render(<UserAvatar alt="Ada" size={48} src="https://example.com/ada.jpg" />);
    const image = screen.getByRole('img', { name: 'Ada' });
    expect(image.getAttribute('src')).toBe('https://example.com/ada.jpg');
    expect(image.getAttribute('width')).toBe('48');
    expect(image.getAttribute('height')).toBe('48');
  });

  it('shows the preview instead of the picture', () => {
    render(
      <UserAvatar
        previewSrc="data:image/png;base64,preview"
        src="https://example.com/ada.jpg"
      />,
    );
    expect(screen.getByRole('img').getAttribute('src')).toBe('data:image/png;base64,preview');
  });

  it('shows the default image when the picture fails to load', () => {
    render(<UserAvatar src="https://example.com/missing.jpg" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img').getAttribute('src')).toBe('test-file-stub');
  });
});
