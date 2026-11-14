import React, { useState } from 'react';
import { describe, it, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutosaveTextarea } from '.';

const getContentEditable = () => document.querySelector('[contenteditable="true"]') as HTMLElement;

const editContent = (field: HTMLElement, next: string) => {
  field.innerHTML = next;
  fireEvent.input(field);
};

const ControlledTextarea = ({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <AutosaveTextarea
      onChange={setValue}
      onSave={onSave}
      value={value}
    />
  );
};

describe('AutosaveTextarea', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(
      <AutosaveTextarea
        onSave={() => undefined}
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Saves the current value on blur', () => {
    const onSave = jest.fn();
    render(
      <AutosaveTextarea
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    const field = getContentEditable();
    fireEvent.focus(field);
    editContent(field, 'Buy oat milk');
    fireEvent.blur(field);

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Buy oat milk');
  });

  it('Saves an empty string when existing text is cleared', () => {
    const onSave = jest.fn();
    render(
      <AutosaveTextarea
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    const field = getContentEditable();
    fireEvent.focus(field);
    editContent(field, '');
    fireEvent.blur(field);

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('');
  });

  it('Saves a cleared value when the field unmounts before the delay', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(
      <AutosaveTextarea
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    try {
      const field = getContentEditable();
      fireEvent.focus(field);
      editContent(field, '');
      unmount();
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith('');
    } finally {
      jest.useRealTimers();
    }
  });

  it('Does not save when the value has not changed', () => {
    const onSave = jest.fn();
    render(
      <AutosaveTextarea
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    const field = getContentEditable();
    fireEvent.focus(field);
    fireEvent.blur(field);

    expect(onSave).not.toHaveBeenCalled();
  });

  it('Restarts the debounce timer on each edit', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(
      <AutosaveTextarea
        defaultValue="Hi"
        onSave={onSave}
      />,
    );

    try {
      const field = getContentEditable();
      fireEvent.focus(field);
      editContent(field, 'Hi t');
      act(() => {
        jest.advanceTimersByTime(999);
      });
      expect(onSave).not.toHaveBeenCalled();

      editContent(field, 'Hi there');
      act(() => {
        jest.advanceTimersByTime(999);
      });
      expect(onSave).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith('Hi there');
    } finally {
      unmount();
      jest.useRealTimers();
    }
  });

  it('Saves a controlled value after a pause', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(
      <ControlledTextarea
        initialValue="Notes"
        onSave={onSave}
      />,
    );

    try {
      const field = getContentEditable();
      fireEvent.focus(field);
      editContent(field, 'Notes today');
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith('Notes today');
    } finally {
      unmount();
      jest.useRealTimers();
    }
  });

  it('Saves a native textarea on blur', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(
      <AutosaveTextarea
        defaultValue="Buy milk"
        onSave={onSave}
        useContentEditableDiv={false}
      />,
    );

    const field = screen.getByDisplayValue('Buy milk');
    await user.click(field);
    await user.type(field, ' today');
    await user.tab();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Buy milk today');
  });

  it('grows a native textarea with its content', () => {
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
        <AutosaveTextarea
          autoResize
          defaultValue={'one\ntwo'}
          onSave={() => undefined}
          useContentEditableDiv={false}
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

const LinkifiedHarness = ({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <AutosaveTextarea
      aria-label="details"
      linkify
      onChange={setValue}
      onSave={onSave}
      value={value}
    />
  );
};

describe('AutosaveTextarea linkify', () => {
  it('Saves the current value on blur', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(<LinkifiedHarness initialValue="Some notes" onSave={onSave} />);

    const field = screen.getByRole('textbox', { name: 'details' });
    await user.type(field, ' today');
    await user.tab();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Some notes today');
  });

  it('Saves an empty string when existing text is cleared', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(<LinkifiedHarness initialValue="Some notes" onSave={onSave} />);

    await user.clear(screen.getByRole('textbox', { name: 'details' }));
    await user.tab();

    expect(onSave).toHaveBeenCalledWith('');
  });

  it('Saves a paused edit before blur', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(<LinkifiedHarness initialValue="Notes" onSave={onSave} />);

    try {
      const field = screen.getByRole('textbox', { name: 'details' });
      fireEvent.focus(field);
      fireEvent.change(field, { target: { value: 'Notes today' } });
      act(() => {
        jest.advanceTimersByTime(999);
      });
      expect(onSave).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1);
      });
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith('Notes today');
    } finally {
      unmount();
      jest.useRealTimers();
    }
  });

  it('Saves a cleared value when the field unmounts before the delay', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(<LinkifiedHarness initialValue="Some notes" onSave={onSave} />);

    try {
      const field = screen.getByRole('textbox', { name: 'details' });
      fireEvent.focus(field);
      fireEvent.change(field, { target: { value: '' } });
      unmount();
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith('');
    } finally {
      jest.useRealTimers();
    }
  });

  it('Renders linked text without a bordered field', () => {
    render(<LinkifiedHarness initialValue="See https://fikas.io/docs" onSave={jest.fn()} />);

    const field = screen.getByRole('textbox', { name: 'details' });
    expect(field).not.toHaveClass('form-control');
    expect(field).toHaveClass('fikasio-linkified-textarea-plain');
    expect(screen.getByRole('link', { name: 'https://fikas.io/docs' })).toBeInTheDocument();
  });

  it('Saves an uncontrolled value that contains a link', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(
      <AutosaveTextarea
        defaultValue="See https://fikas.io/docs"
        linkify
        onSave={onSave}
      />,
    );

    expect(screen.getByRole('link', { name: 'https://fikas.io/docs' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), ' now');
    await user.tab();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('See https://fikas.io/docs now');
  });
});
