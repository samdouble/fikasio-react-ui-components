import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from '.';

const calendar = () => document.querySelector('.react-datepicker');

describe('DatePicker', () => {
  it('Renders correctly', () => {
    const { baseElement } = render(<DatePicker />);
    expect(baseElement).toMatchSnapshot();
  });

  it('can reopen after the calendar icon is used to close it', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DatePicker defaultValue={new Date('2026-08-31')} showTimeSelect={false} />,
    );
    const icon = container.querySelector('.fikasio-datepicker svg') as SVGElement;

    await user.click(icon);
    expect(calendar()).toBeTruthy();

    await user.click(icon);
    expect(calendar()).toBeFalsy();

    await user.click(icon);
    expect(calendar()).toBeTruthy();
  });

  it('can reopen after an outside click closes it', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DatePicker defaultValue={new Date('2026-08-31')} showTimeSelect={false} />,
    );
    const icon = container.querySelector('.fikasio-datepicker svg') as SVGElement;

    await user.click(icon);
    expect(calendar()).toBeTruthy();

    fireEvent.mouseDown(document.body);
    expect(calendar()).toBeFalsy();

    await user.click(icon);
    expect(calendar()).toBeTruthy();
  });
});
