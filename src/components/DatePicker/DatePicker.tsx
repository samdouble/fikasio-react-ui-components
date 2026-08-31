import React, { SyntheticEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import DP from 'react-datepicker';
import { DateTime } from 'luxon';
import { CalendarDaysIcon, XmarkIcon } from '../../icons';
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
  showRemoveValue?: boolean;
  showTimeSelect?: boolean;
  style?: React.CSSProperties;
  timeCaption?: string;
  timeFormat?: string;
  timeIntervals?: number;
  value?: Date,
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
  showRemoveValue = false,
  showTimeSelect = true,
  style = {},
  timeCaption = 'Hours',
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  value = undefined,
}: DatePickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(pIsOpen);
  const [isOpen, setIsOpen] = useState(pIsOpen);
  const [prevPIsOpen, setPrevPIsOpen] = useState(pIsOpen);
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  if (pIsOpen !== prevPIsOpen) {
    setPrevPIsOpen(pIsOpen);
    setIsOpen(pIsOpen);
    isOpenRef.current = pIsOpen;
  }

  const handleOpen = () => {
    if (isOpenRef.current) {
      return;
    }
    isOpenRef.current = true;
    setIsOpen(true);
    onOpen();
  };

  const handleClose = () => {
    if (!isOpenRef.current) {
      return;
    }
    isOpenRef.current = false;
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
      : DateTime.fromJSDate(currentValue).toFormat(displayFormat ?? 'yyyy-MM-dd');
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
              currentValue ? (DateTime.fromJSDate(currentValue).toISO() ?? undefined) : undefined
            }
          />
        )}
        dateFormat={dateFormat}
        name={name}
        onCalendarClose={handleClose}
        onChange={handleChange}
        onClickOutside={handleClickOutside}
        open={isOpen}
        popperClassName="fikasio-datepicker_popper"
        popperPlacement="bottom-end"
        preventOpenOnFocus
        selected={defaultValue}
        shouldCloseOnSelect={shouldCloseOnSelect}
        showPopperArrow={false}
        showTimeSelect={showTimeSelect}
        timeCaption={timeCaption}
        timeFormat={timeFormat}
        timeIntervals={timeIntervals}
      />
      <CalendarDaysIcon
        onClick={() => {
          if (isOpenRef.current) {
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
