import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import DP, { ReactDatePicker } from 'react-datepicker';
import ClickOutside from 'react-click-outside';
import { DateTime } from 'luxon';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';

interface DatePickerProps {
  className?: string;
  defaultValue?: Date;
  isOpen?: boolean;
  name?: string;
  onBlur?: () => void;
  onChange?: (date: Date) => void;
  shouldCloseOnSelect?: boolean;
  showTimeSelect?: boolean;
  style?: React.CSSProperties;
  timeCaption?: string;
  timeFormat?: string;
  timeIntervals?: number;
  value?: Date,
}

export function DatePicker({
  className,
  defaultValue,
  isOpen: pIsOpen,
  name,
  onBlur,
  onChange,
  shouldCloseOnSelect,
  showTimeSelect,
  style,
  timeCaption,
  timeFormat,
  timeIntervals,
  value,
}: DatePickerProps) {
  let calendar = useRef(null) as ReactDatePicker;
  const [isOpen, setIsOpen] = useState(pIsOpen);

  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<Date | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  useEffect(() => {
    if (calendar) {
      calendar.setOpen(isOpen);
    }
  }, [calendar, isOpen]);

  const handleChange = (newValue: Date) => {
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

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
        onClickOutside={() => setIsOpen(false)}
      >
        <DP
          customInput={(
            <input
              name={name}
              type="hidden"
              value={DateTime.fromJSDate(currentValue).toISO()}
            />
          )}
          name={name}
          onBlur={onBlur}
          onChange={handleChange}
          popperPlacement="auto"
          ref={c => { calendar = c; }}
          selected={defaultValue}
          shouldCloseOnSelect={shouldCloseOnSelect || false}
          showTimeSelect={showTimeSelect}
          timeCaption={timeCaption}
          timeFormat={timeFormat}
          timeIntervals={timeIntervals}
        />
      </ClickOutside>
    </div>
  );
}

DatePicker.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.instanceOf(Date),
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  shouldCloseOnSelect: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  timeCaption: PropTypes.string,
  timeFormat: PropTypes.string,
  timeIntervals: PropTypes.number,
  value: PropTypes.instanceOf(Date),
};
DatePicker.defaultProps = {
  className: '',
  defaultValue: undefined,
  isOpen: false,
  name: undefined,
  onBlur: () => undefined,
  onChange: () => undefined,
  shouldCloseOnSelect: true,
  showTimeSelect: true,
  style: {},
  timeCaption: 'Hours',
  timeFormat: 'HH:mm',
  timeIntervals: 15,
  value: undefined,
};

export default DatePicker;
