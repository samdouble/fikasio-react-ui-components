import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Selector.scss';

export interface SelectorProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Selector({
  className,
  style,
}: SelectorProps) {
  const theme = useTheme();

  return (
    <span
      className={classNames({
        'fikasio-selector': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        ...style,
      }}
    >
      <span
        style={{
          bottom: -1,
          paddingLeft: 4,
          position: 'relative',
        }}
      >
        +
      </span>
    </span>
  );
}

Selector.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Selector.defaultProps = {
  className: '',
  style: {},
};

export default Selector;
