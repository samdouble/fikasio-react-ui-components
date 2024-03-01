import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Input.scss';

export interface InputProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  value?: string;
}

export function Input({
  className,
  defaultValue,
  name,
  onChange,
  style,
  value,
}: InputProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string>(
    hasDefaultValue ? defaultValue : '',
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  const handleChange = (newValue) => {
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
        'fikasio-input': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        border: '1px solid #cccccc',
        ...style,
      }}
    >
      <input
        className="form-control"
        name={name}
        onChange={e => handleChange(e.target.value)}
        style={{
          border: 'none',
          borderRadius: 0,
          height: 30,
          padding: 3,
          paddingLeft: 10,
          width: '98%',
        }}
        value={currentValue}
      />
    </div>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.bool,
};
Input.defaultProps = {
  className: '',
  defaultValue: undefined,
  name: undefined,
  onChange: () => undefined,
  style: {},
  value: undefined,
};

export default Input;
