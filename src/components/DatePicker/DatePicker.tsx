import React, { SyntheticEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import DP, { type ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { format, formatISO } from 'date-fns';
import { CalendarDaysIcon, CaretLeftIcon, CaretRightIcon, XmarkIcon } from '../../icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

export interface DatePickerProps {
  className?: string;
  dateFormat?: string,
  defaultValue?: Date;
  displayFormat?: string;
  displayFunction?: (value: Date) => string;
  isOpen?: boolean;
  name?: string;
  onChange?: (value: Date) => void;
  onClose?: () => void;
  onOpen?: () => void;
  onRemoveValue?: (e: SyntheticEvent) => void;
  shouldCloseOnSelect?: boolean;
  showMonthDropdown?: boolean;
  showRemoveValue?: boolean;
  showTimeSelect?: boolean;
  showYearDropdown?: boolean;
  style?: React.CSSProperties;
  timeCaption?: string;
  timeFormat?: string;
  timeIntervals?: number;
  value?: Date,
}

function DatePickerHeader({
  decreaseMonth,
  decreaseYear,
  increaseMonth,
  increaseYear,
  monthDate,
  nextMonthButtonDisabled,
  nextYearButtonDisabled,
  prevMonthButtonDisabled,
  prevYearButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <div className="fikasio-datepicker-header">
      <div className="fikasio-datepicker-header-nav">
        <button
          aria-label="Previous year"
          className="fikasio-datepicker-nav"
          disabled={prevYearButtonDisabled}
          onClick={decreaseYear}
          type="button"
        >
          <span className="fikasio-datepicker-double-caret">
            <CaretLeftIcon size="lg" />
            <CaretLeftIcon size="lg" />
          </span>
        </button>
        <button
          aria-label="Previous month"
          className="fikasio-datepicker-nav"
          disabled={prevMonthButtonDisabled}
          onClick={decreaseMonth}
          type="button"
        >
          <CaretLeftIcon size="lg" />
        </button>
      </div>
      <span className="fikasio-datepicker-header-label">
        {format(monthDate, 'LLLL yyyy')}
      </span>
      <div className="fikasio-datepicker-header-nav">
        <button
          aria-label="Next month"
          className="fikasio-datepicker-nav"
          disabled={nextMonthButtonDisabled}
          onClick={increaseMonth}
          type="button"
        >
          <CaretRightIcon size="lg" />
        </button>
        <button
          aria-label="Next year"
          className="fikasio-datepicker-nav"
          disabled={nextYearButtonDisabled}
          onClick={increaseYear}
          type="button"
        >
          <span className="fikasio-datepicker-double-caret">
            <CaretRightIcon size="lg" />
            <CaretRightIcon size="lg" />
          </span>
        </button>
      </div>
    </div>
  );
}

export function DatePicker({
  className = '',
  dateFormat = 'yyyy-MM-dd',
  defaultValue = undefined,
  displayFormat = undefined,
  displayFunction = undefined,
  isOpen: pIsOpen = false,
  name = undefined,
  onChange = () => undefined,
  onClose = () => undefined,
  onOpen = () => undefined,
  onRemoveValue = () => undefined,
  shouldCloseOnSelect = true,
  showMonthDropdown = false,
  showRemoveValue = false,
  showTimeSelect = true,
  showYearDropdown = false,
  style = {},
  timeCaption = 'Hours',
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  value = undefined,
}: DatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(pIsOpen);
  const [prevPIsOpen, setPrevPIsOpen] = useState(pIsOpen);
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;
  const useDropdownNavigation = showMonthDropdown || showYearDropdown;

  const theme = useTheme();

  if (pIsOpen !== prevPIsOpen) {
    setPrevPIsOpen(pIsOpen);
    setIsOpen(pIsOpen);
  }

  const handleOpen = () => {
    setIsOpen(true);
    onOpen();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = (
      event.composedPath?.().find(eventTarget => eventTarget instanceof Node) ?? event.target
    ) as Node | null;
    if (target && containerRef.current?.contains(target)) {
      event.preventDefault();
      return;
    }
    handleClose();
  };

  const handleChange = (newValue: Date | null) => {
    if (newValue && onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue ?? undefined);
    }
    if (shouldCloseOnSelect) {
      handleClose();
    }
  };

  let displayedDate: string | null = null;
  if (currentValue) {
    displayedDate = displayFunction
      ? displayFunction(currentValue)
      : format(currentValue, displayFormat ?? 'yyyy-MM-dd');
  }

  return (
    <div
      className={classNames({
        'fikasio-datepicker': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      ref={containerRef}
      style={{
        ...style,
      }}
    >
      <DP
        customInput={(
          <input
            name={name}
            type="hidden"
            value={
              currentValue ? formatISO(currentValue) : undefined
            }
          />
        )}
        dateFormat={dateFormat}
        dropdownMode="select"
        name={name}
        onCalendarClose={handleClose}
        onChange={handleChange}
        onClickOutside={handleClickOutside}
        open={isOpen}
        popperClassName="fikasio-datepicker_popper"
        popperPlacement="bottom-end"
        preventOpenOnFocus
        renderCustomHeader={useDropdownNavigation ? undefined : DatePickerHeader}
        selected={defaultValue}
        shouldCloseOnSelect={shouldCloseOnSelect}
        showMonthDropdown={showMonthDropdown}
        showPopperArrow={false}
        showTimeSelect={showTimeSelect}
        showYearDropdown={showYearDropdown}
        timeCaption={timeCaption}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
      />
      <CalendarDaysIcon
        onClick={() => {
          if (isOpen) {
            handleClose();
          } else {
            handleOpen();
          }
        }}
        size="1x"
        style={{ marginRight: 10 }}
      />
      {displayedDate}
      {
        showRemoveValue && currentValue && (
          <XmarkIcon
            className="fikasio-datepicker_dueAt_remove"
            onClick={e => {
              if (onRemoveValue) {
                onRemoveValue(e);
              }
            }}
            size="1x"
          />
        )
      }
    </div>
  );
}

export default DatePicker;
