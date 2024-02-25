import React, { SyntheticEvent, useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Select.scss';

export interface SelectProps {
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: any[];
  style?: React.CSSProperties;
  value?: string;
}

export function Select({
  className,
  defaultValue,
  onChange,
  options,
  style,
  value,
}: SelectProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return (
    <span
      className={classNames({
        'fikasio-select': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        ...style,
      }}
    >
      <ReactSelect
        defaultValue={options.find(o => o.value === defaultValue)}
        onChange={handleChange}
        options={options}
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            borderRadius: 0,
          }),
        }}
        value={currentValue}
      />
    </span>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,
};
Select.defaultProps = {
  className: '',
  defaultValue: undefined,
  onChange: () => undefined,
  options: [],
  style: {},
  value: undefined,
};

export default Select;
