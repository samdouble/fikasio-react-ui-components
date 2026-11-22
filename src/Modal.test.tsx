import React from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button, Modal, useTheme } from '.';

function ThemeProbe({ theme }: { theme: string }) {
  useTheme(theme);
  return null;
}

describe('Modal', () => {
  it('Renders nothing while closed', () => {
    render(
      <Modal title="Hidden">
        Body
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByText('Body')).toBeNull();
  });

  it('Renders correctly', () => {
    const { baseElement } = render(
      <Modal
        footer={<Button.Action type="button">Save</Button.Action>}
        isOpen
        title="Check the form"
      >
        A few fields still need attention.
      </Modal>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('Closes from the close button, Escape, and the backdrop', () => {
    const onClose = jest.fn();
    const { unmount } = render(
      <Modal
        isOpen
        onClose={onClose}
        title="Notice"
      >
        Saved
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.click(document.querySelector('.fikasio-modal-backdrop') as Element);

    expect(onClose).toHaveBeenCalledTimes(3);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('Does not close from the message itself', () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen
        onClose={onClose}
        title="Notice"
      >
        Saved
      </Modal>,
    );

    fireEvent.click(screen.getByText('Saved'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('Keeps a static backdrop from closing the dialog', () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen
        onClose={onClose}
        staticBackdrop
        title="Notice"
      >
        Saved
      </Modal>,
    );

    fireEvent.click(document.querySelector('.fikasio-modal-backdrop') as Element);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('Stays open when it is not dismissible', () => {
    const onClose = jest.fn();
    render(
      <Modal
        dismissible={false}
        isOpen
        onClose={onClose}
        title="Notice"
      >
        Saved
      </Modal>,
    );

    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    fireEvent.click(document.querySelector('.fikasio-modal-backdrop') as Element);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('Uses the given size and class name', () => {
    render(
      <Modal
        className="extra"
        isOpen
        size="lg"
        title="Done"
      >
        Saved
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Done' });
    expect(dialog.classList.contains('fikasio-modal-content')).toBe(true);
    expect(dialog.classList.contains('extra')).toBe(true);
    expect(document.querySelector('.fikasio-modal-lg')).toBeTruthy();
  });

  it('Moves focus into the dialog and keeps Tab inside it', () => {
    render(
      <button type="button">
        Outside
      </button>,
    );
    const outside = screen.getByRole('button', { name: 'Outside' });
    outside.focus();

    render(
      <Modal
        footer={<Button.Action type="button">Save</Button.Action>}
        isOpen
        title="Notice"
      >
        Saved
      </Modal>,
    );

    const dialog = screen.getByRole('dialog');
    const close = screen.getByRole('button', { name: 'Close' });
    const save = screen.getByRole('button', { name: 'Save' });
    expect(document.activeElement).toBe(dialog);

    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(close);

    save.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(close);

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(save);
  });

  it('Uses a dark panel in the dark theme', () => {
    const { unmount } = render(<ThemeProbe theme="dark" />);
    unmount();

    try {
      render(
        <Modal
          isOpen
          title="Notice"
        >
          Saved
        </Modal>,
      );

      expect(screen.getByRole('dialog').classList.contains('fikasio-theme-dark')).toBe(true);
    } finally {
      render(<ThemeProbe theme="light" />);
    }
  });
});
