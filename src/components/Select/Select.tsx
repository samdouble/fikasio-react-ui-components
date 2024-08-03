import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Select.scss';

export interface SelectProps {
  className?: string;
  defaultValue?: string;
  menuPortalTarget?: HTMLElement | null;
  menuShouldScrollIntoView?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  options?: any[];
  style?: React.CSSProperties;
  value?: string;
}

export function Select({
  className = '',
  defaultValue = undefined,
  menuPortalTarget = document.querySelector('body'),
  menuShouldScrollIntoView = false,
  name = undefined,
  onChange = () => undefined,
  options = [],
  style = {},
  value = undefined,
}: SelectProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  const handleChange = option => {
    const newValue = option.value;
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
      style={style}
    >
      {
        name && (
          <input
            name={name}
            type="hidden"
            value={currentValue}
          />
        )
      }
      <ReactSelect
        classNamePrefix="fikasio-select"
        defaultValue={options.find(o => o.value === currentValue)}
        onChange={handleChange}
        menuPortalTarget={menuPortalTarget || undefined}
        menuPosition='fixed'
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        options={options}
        placeholder=""
        styles={{
          container: baseStyles => ({
            ...baseStyles,
            ...(style?.minWidth && { width: style.minWidth }),
            ...(style?.width && { width: style.width }),
          }),
          control: baseStyles => ({
            ...baseStyles,
            border: style?.border || '1px solid #cccccc',
            borderColor: style?.borderColor,
            borderRadius: style?.borderRadius || 0,
            borderStyle: style?.borderStyle,
            borderWidth: style?.borderWidth,
          }),
          menu: baseStyles => ({
            ...baseStyles,
            borderRadius: style?.borderRadius || 0,
            marginTop: 2,
          }),
          menuList: baseStyles => ({
            ...baseStyles,
            paddingTop: 0,
            paddingBottom: 0,
          }),
          menuPortal: ({ left, top, ...provided }) => ({
            ...provided,
          }),
        }}
        value={options.find(o => o.value === currentValue)}
      />
    </span>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  menuPortalTarget: PropTypes.element,
  menuShouldScrollIntoView: PropTypes.bool,
  name: PropTypes.string,
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

export default Select;
