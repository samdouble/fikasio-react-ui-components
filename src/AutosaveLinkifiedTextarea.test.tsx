import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AutosaveLinkifiedTextarea } from '.';

const Harness = ({
  initialValue,
  onSave,
}: {
  initialValue: string;
  onSave: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <AutosaveLinkifiedTextarea
      aria-label="details"
      onChange={event => setValue(event.target.value)}
      onSave={onSave}
      value={value}
    />
  );
};

describe('AutosaveLinkifiedTextarea', () => {
  it('Should save the current value on blur', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(<Harness initialValue="Some notes" onSave={onSave} />);

    const field = screen.getByRole('textbox', { name: 'details' });
    await user.type(field, ' today');
    await user.tab();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Some notes today');
  });

  it('Should save an empty string when existing text is cleared', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(<Harness initialValue="Some notes" onSave={onSave} />);

    await user.clear(screen.getByRole('textbox', { name: 'details' }));
    await user.tab();

    expect(onSave).toHaveBeenCalledWith('');
  });

  it('Should save a paused edit before blur', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(<Harness initialValue="Notes" onSave={onSave} />);

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

  it('Should save a cleared value when the field unmounts before the delay', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(<Harness initialValue="Some notes" onSave={onSave} />);

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

  it('Should render linked text without a bordered field', () => {
    render(<Harness initialValue="See https://fikas.io/docs" onSave={jest.fn()} />);

    const field = screen.getByRole('textbox', { name: 'details' });
    expect(field).not.toHaveClass('form-control');
    expect(field).toHaveClass('fikasio-linkified-textarea-plain');
    expect(screen.getByRole('link', { name: 'https://fikas.io/docs' })).toBeInTheDocument();
  });
});
