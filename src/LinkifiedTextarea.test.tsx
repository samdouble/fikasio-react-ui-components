import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LinkifiedTextarea from './components/LinkifiedTextarea/LinkifiedTextarea';

describe('LinkifiedTextarea', () => {
  it('keeps plain text in a textarea', () => {
    render(
      <LinkifiedTextarea
        onChange={jest.fn()}
        value="Ship the launch"
      />,
    );

    expect(screen.getByDisplayValue('Ship the launch').tagName).toBe('TEXTAREA');
  });

  it('shows urls as links until the field is edited', async () => {
    const user = userEvent.setup();
    render(
      <LinkifiedTextarea
        onChange={jest.fn()}
        value="See https://fikas.io/docs"
      />,
    );

    const link = screen.getByRole('link', { name: 'https://fikas.io/docs' });
    expect(link).toHaveAttribute('href', 'https://fikas.io/docs');
    expect(link).toHaveAttribute('target', '_blank');

    await user.click(link);
    expect(screen.getByRole('link', { name: 'https://fikas.io/docs' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
    expect(screen.getByRole('textbox')).toHaveValue('See https://fikas.io/docs');
  });
});
