import React, { useState } from 'react';
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
});
