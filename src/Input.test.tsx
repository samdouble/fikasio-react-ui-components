import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '.';

const mockContentHeight = (heightFor: (text: string) => number) => {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight');
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      const text = 'value' in this ? String((this as HTMLTextAreaElement).value) : '';
      return heightFor(text);
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
  return () => {
    computedStyle.mockRestore();
    if (descriptor) {
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', descriptor);
    }
  };
};

describe('Input', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<Input />);
    expect(baseElement).toMatchSnapshot();
  });

  it('places the caret at the start when autoFocus is set', () => {
    render(
      <Input
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
      <Input
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
      <Input
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
      <Input
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
      <Input
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
      <Input
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

  it('grows and shrinks a multiline field with its content', () => {
    const restore = mockContentHeight(text => text.split('\n').length * 24);
    try {
      render(
        <Input
          autoResize
          defaultValue="one"
          multiline
        />,
      );

      const field = screen.getByDisplayValue('one') as HTMLTextAreaElement;
      expect(field).toHaveClass('fikasio-autosize');
      expect(field.style.height).toBe('24px');

      fireEvent.change(field, { target: { value: 'one\ntwo\nthree' } });
      expect(field.style.height).toBe('72px');

      fireEvent.change(field, { target: { value: 'one' } });
      expect(field.style.height).toBe('24px');
    } finally {
      restore();
    }
  });

  it('keeps a fixed height until autoResize is set', () => {
    const restore = mockContentHeight(() => 72);
    try {
      render(
        <Input
          defaultValue={'one\ntwo'}
          multiline
        />,
      );

      expect((screen.getByRole('textbox') as HTMLTextAreaElement).style.height).toBe('');
    } finally {
      restore();
    }
  });

  it('grows when the field gets narrower and the text wraps', () => {
    let contentHeight = 24;
    let clientWidth = 240;
    const restoreScrollHeight = mockContentHeight(() => contentHeight);
    const widthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth');
    let observer: ResizeObserver | null = null;
    const NativeResizeObserver = global.ResizeObserver;
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get() {
        return clientWidth;
      },
    });
    global.ResizeObserver = class {
      constructor(callback: ResizeObserverCallback) {
        observer = { callback } as unknown as ResizeObserver;
      }

      disconnect() {
        return undefined;
      }

      observe() {
        return undefined;
      }

      unobserve() {
        return undefined;
      }
    } as unknown as typeof ResizeObserver;

    try {
      render(
        <Input
          autoResize
          defaultValue="A note that wraps"
          multiline
        />,
      );
      const field = screen.getByDisplayValue('A note that wraps') as HTMLTextAreaElement;
      expect(field.style.height).toBe('24px');

      contentHeight = 48;
      clientWidth = 120;
      const callback = (observer as unknown as { callback: ResizeObserverCallback }).callback;
      act(() => {
        callback([], observer as ResizeObserver);
      });

      expect(field.style.height).toBe('48px');
    } finally {
      restoreScrollHeight();
      global.ResizeObserver = NativeResizeObserver;
      if (widthDescriptor) {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', widthDescriptor);
      }
    }
  });
});
