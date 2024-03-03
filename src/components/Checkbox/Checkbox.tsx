import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Checkbox.scss';

library.add(faCheck, faSquare);

export interface CheckboxProps {
  className?: string;
  defaultIsChecked?: boolean;
  isChecked?: boolean;
  name?: string;
  onClick?: (value: boolean) => void;
  style?: React.CSSProperties;
}

export function Checkbox({
  className,
  defaultIsChecked,
  isChecked,
  name,
  onClick,
  style,
}: CheckboxProps) {
  const isControlled = typeof isChecked !== 'undefined';
  const hasDefaultValue = typeof defaultIsChecked !== 'undefined';
  const [internalValue, setInternalValue] = useState<boolean>(
    hasDefaultValue ? defaultIsChecked : false,
  );
  const currentValue = isControlled ? isChecked : internalValue;

  const theme = useTheme();

  const handleClick = () => {
    const newValue = !currentValue;
    if (onClick) {
      onClick(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  return (
    <div
      className={classNames({
        'fikasio-checkbox': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      style={{
        ...style,
      }}
      tabIndex={0}
    >
      {
        name && (
          <input
            name={name}
            type="hidden"
            value={currentValue.toString()}
          />
        )
      }
      {
        currentValue ? (
          <FontAwesomeIcon
            icon="check"
            size="lg"
            style={{
              border: '1px solid #7E5B9A',
              color: '#420076',
              width: 20,
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon="square"
            size="lg"
            style={{
              border: '1px solid #7E5B9A',
              color: '#ffffff',
              width: 20,
            }}
          />
        )
      }
    </div>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  defaultIsChecked: PropTypes.bool,
  isChecked: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Checkbox.defaultProps = {
  className: '',
  defaultIsChecked: undefined,
  isChecked: undefined,
  name: undefined,
  onClick: () => undefined,
  style: {},
};

export default Checkbox;
