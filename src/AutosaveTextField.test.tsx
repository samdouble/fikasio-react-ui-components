import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutosaveTextField from './components/AutosaveTextField/AutosaveTextField';

describe('AutosaveTextField', () => {
  it('places the caret at the start when autoFocus is set', () => {
    render(
      <AutosaveTextField
        {...{ autoFocus: true }}
        defaultValue="Buy milk"
      />,
    );

    const input = screen.getByDisplayValue('Buy milk') as HTMLInputElement;
    expect(document.activeElement).toBe(input);
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(0);
  });

  it('saves the current value on blur', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(
      <AutosaveTextField
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    const input = screen.getByDisplayValue('Buy milk') as HTMLInputElement;
    await user.click(input);
    await user.type(input, '{arrowleft}{arrowleft}{arrowleft}{arrowleft}oat ');
    await user.tab();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Buy oat milk');
    expect(document.activeElement).not.toBe(input);
    expect(input.value).toBe('Buy oat milk');
  });

  it('saves an empty string when existing text is cleared', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(
      <AutosaveTextField
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    const input = screen.getByDisplayValue('Buy milk') as HTMLInputElement;
    await user.clear(input);
    await user.tab();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('');
    expect(input.value).toBe('');
  });

  it('saves a cleared value when the field unmounts before the delay', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(
      <AutosaveTextField
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    try {
      fireEvent.change(screen.getByDisplayValue('Buy milk'), { target: { value: '' } });
      unmount();
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith('');
    } finally {
      jest.useRealTimers();
    }
  });

  it('does not save when the value has not changed', async () => {
    const user = userEvent.setup();
    const onSave = jest.fn();
    render(
      <AutosaveTextField
        defaultValue="Buy milk"
        onSave={onSave}
      />,
    );

    await user.click(screen.getByDisplayValue('Buy milk'));
    await user.tab();

    expect(onSave).not.toHaveBeenCalled();
  });

  it('restarts the debounce timer on each keystroke', () => {
    jest.useFakeTimers();
    const onSave = jest.fn();
    const { unmount } = render(
      <AutosaveTextField
        defaultValue="Hi"
        onSave={onSave}
      />,
    );

    try {
      const input = screen.getByDisplayValue('Hi');
      fireEvent.change(input, { target: { value: 'Hi t' } });
      act(() => {
        jest.advanceTimersByTime(999);
      });
      expect(onSave).not.toHaveBeenCalled();

      fireEvent.change(input, { target: { value: 'Hi there' } });
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
});
