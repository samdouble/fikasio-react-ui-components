import { describe, it, expect, jest } from '@jest/globals';
import '@testing-library/jest-dom/jest-globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OtpInput } from '.';

describe('OtpInput', () => {
  it('focuses the first box when autoFocus is set', () => {
    render(
      <OtpInput
        {...{ autoFocus: true }}
        onChange={() => undefined}
        value=""
      />,
    );

    expect(document.activeElement).toBe(screen.getAllByRole('textbox')[0]);
  });

  it('Renders correctly', () => {
    const { baseElement } = render(
      <OtpInput
        onChange={() => undefined}
        value=""
      />,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('Should distribute a pasted alphanumeric code across all boxes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} value="" />);

    await user.click(screen.getAllByRole('textbox')[0]);
    await user.paste('ab12cd');

    expect(onChange).toHaveBeenCalledWith('AB12CD');
  });

  it('Should ignore non-alphanumeric characters when pasting', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<OtpInput onChange={onChange} value="" />);

    await user.click(screen.getAllByRole('textbox')[0]);
    await user.paste('AB-12 CD');

    expect(onChange).toHaveBeenCalledWith('AB12CD');
  });

  it('Should move to the next box after typing a character', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { rerender } = render(<OtpInput onChange={onChange} value="" />);

    await user.type(screen.getAllByRole('textbox')[0], 'k');
    expect(onChange).toHaveBeenCalledWith('K');

    rerender(<OtpInput onChange={onChange} value="K" />);
    expect(screen.getAllByRole('textbox')[1]).toHaveFocus();
  });
});
