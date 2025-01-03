import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Dot.scss';

export interface DotProps {
  className?: string;
  color?: string;
  size: number;
  style?: React.CSSProperties;
}

export function Dot({
  className = '',
  color = '#000000',
  size,
  style = {},
}: DotProps) {
  const theme = useTheme();

  return (
    <span
      className={classNames({
        'fikasio-dot': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        backgroundColor: color,
        height: size,
        width: size,
        ...style,
      }}
    />
  );
}

Dot.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Dot;
