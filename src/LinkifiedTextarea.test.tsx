import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
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

  it('grows the field with its content', () => {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight');
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        const text = 'value' in this ? String((this as HTMLTextAreaElement).value) : '';
        return text.split('\n').length * 24;
      },
    });
    const computedStyle = jest.spyOn(window, 'getComputedStyle').mockReturnValue({
      borderBottomWidth: '0px',
      borderTopWidth: '0px',
      boxSizing: 'content-box',
      maxHeight: 'none',
      paddingBottom: '0px',
      paddingTop: '0px',
    } as CSSStyleDeclaration);

    try {
      render(
        <LinkifiedTextarea
          autoResize
          onChange={jest.fn()}
          value={'one\ntwo'}
        />,
      );

      const field = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(field).toHaveClass('fikasio-autosize');
      expect(field.style.height).toBe('48px');
    } finally {
      computedStyle.mockRestore();
      if (descriptor) {
        Object.defineProperty(HTMLElement.prototype, 'scrollHeight', descriptor);
      }
    }
  });
});
