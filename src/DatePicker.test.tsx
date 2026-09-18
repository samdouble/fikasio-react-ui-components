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

  it('opens the calendar at the bottom of the picker', () => {
    render(
      <DatePicker
        defaultValue={new Date('2026-08-31')}
        isOpen
        showTimeSelect={false}
      />,
    );

    expect(
      document.querySelector('.fikasio-datepicker_popper')?.getAttribute('data-placement'),
    ).toBe('bottom-start');
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

  it('skips a year with the double caret buttons', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <DatePicker
        defaultValue={new Date('2026-08-31')}
        isOpen
        showTimeSelect={false}
      />,
    );

    const headerLabel = () => document.querySelector('.fikasio-datepicker-header-label');
    expect(headerLabel()?.textContent).toBe('August 2026');

    await user.click(getByRole('button', { name: 'Previous year' }));

    expect(headerLabel()?.textContent).toBe('August 2025');
    expect(calendar()).toBeTruthy();

    await user.click(getByRole('button', { name: 'Next year' }));
    await user.click(getByRole('button', { name: 'Next year' }));

    expect(headerLabel()?.textContent).toBe('August 2027');
    expect(calendar()).toBeTruthy();
  });

  it('shows a year dropdown when showYearDropdown is true', async () => {
    const user = userEvent.setup();
    render(
      <DatePicker
        defaultValue={new Date('2026-08-31')}
        isOpen
        showTimeSelect={false}
        showYearDropdown
      />,
    );

    const yearSelect = document.querySelector('.react-datepicker__year-select') as HTMLSelectElement;
    expect(yearSelect).toBeTruthy();
    expect(yearSelect.value).toBe('2026');

    await user.selectOptions(yearSelect, '2018');

    expect(yearSelect.value).toBe('2018');
    expect(calendar()).toBeTruthy();
  });

  it('hides the year carets when a year dropdown is shown', () => {
    const { queryByRole } = render(
      <DatePicker
        defaultValue={new Date('2026-08-31')}
        isOpen
        showTimeSelect={false}
        showYearDropdown
      />,
    );

    expect(queryByRole('button', { name: 'Previous year' })).toBeNull();
    expect(document.querySelector('.react-datepicker__year-select')).toBeTruthy();
  });

  it('shows a month dropdown when showMonthDropdown is true', () => {
    render(
      <DatePicker
        defaultValue={new Date('2026-08-31')}
        isOpen
        showMonthDropdown
        showTimeSelect={false}
      />,
    );

    const monthSelect = document.querySelector('.react-datepicker__month-select') as HTMLSelectElement;
    expect(monthSelect).toBeTruthy();
  });
});
