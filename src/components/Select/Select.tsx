import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Select.scss';

export interface SelectProps {
  className?: string;
  options: { label: string; value: string; }[];
  style?: React.CSSProperties;
}

export function Select({
  className,
  options,
  style,
}: SelectProps) {
  const theme = useTheme();

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
        options={options}
      />
    </span>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Select.defaultProps = {
  className: '',
  options: [],
  style: {},
};

export default Select;
