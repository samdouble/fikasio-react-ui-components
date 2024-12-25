import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DP, { ReactDatePicker } from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ClickOutside from 'react-click-outside';
import { DateTime } from 'luxon';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';

library.add(faCalendarAlt);

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
  let _calendar = useRef(null) as ReactDatePicker;
  const [isOpen, setIsOpen] = useState(pIsOpen);

  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  useEffect(() => {
    if (pIsOpen !== isOpen) {
      setIsOpen(pIsOpen);
    }
  }, [pIsOpen]);

  useEffect(() => {
    if (_calendar) {
      _calendar.setOpen(isOpen);
    }
  }, [_calendar, isOpen]);

  const handleChange = (newValue: Date) => {
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  let displayedDate: string | null = null;
  if (currentValue) {
    if (displayFunction) {
      displayedDate = displayFunction(currentValue);
    } else {
      displayedDate = DateTime.fromJSDate(currentValue).toFormat(displayFormat || 'yyyy-MM-dd');
    }
  }

  return (
    <div
      className={classNames({
        'fikasio-datepicker': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        ...style,
      }}
    >
      <ClickOutside
        onClickOutside={() => {
          setIsOpen(false);
          if (onClose) {
            onClose();
          }
        }}
      >
        <DP
          customInput={(
            <input
              name={name}
              type="hidden"
              value={DateTime.fromJSDate(currentValue).toISO()}
            />
          )}
          dateFormat={dateFormat}
          name={name}
          onBlur={() => {
            setIsOpen(false);
            if (onClose) {
              onClose();
            }
          }}
          onChange={handleChange}
          popperPlacement="auto"
          popperProps={{
            positionFixed: true,
          }}
          ref={c => { _calendar = c; }}
          selected={defaultValue}
          shouldCloseOnSelect={shouldCloseOnSelect}
          showTimeSelect={showTimeSelect}
          timeCaption={timeCaption}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
        />
      </ClickOutside>
      <FontAwesomeIcon
        icon="calendar-alt"
        onClick={() => {
          setIsOpen(true);
          if (onOpen) {
            onOpen();
          }
        }}
        size="1x"
        style={{ marginRight: 10 }}
      />
      {displayedDate}
      {
        showRemoveValue && currentValue && (
          <FontAwesomeIcon
            className="fikasio-datepicker_dueAt_remove"
            icon="times"
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

DatePicker.propTypes = {
  className: PropTypes.string,
  dateFormat: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
  displayFormat: PropTypes.string,
  displayFunction: PropTypes.func,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onRemoveValue: PropTypes.func,
  shouldCloseOnSelect: PropTypes.bool,
  showRemoveValue: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  timeCaption: PropTypes.string,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  value: PropTypes.instanceOf(Date),
};

export default DatePicker;
