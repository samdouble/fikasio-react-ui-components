import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './DropdownOptions.scss';

library.add(faEllipsis);

export interface DropdownToggleProps {
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
  style?: React.CSSProperties;
}

const DropdownToggle = React.forwardRef((
  {
    className = '',
    onClick = () => undefined,
    style = {},
  }: DropdownToggleProps,
  ref: any,
) => {
  const theme = useTheme();

  const handleClick = e => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={classNames({
        'fikasio-dropdownOptions-toggle': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      onClick={handleClick}
      onKeyDown={handleClick}
      ref={ref}
      role="button"
      style={style}
      tabIndex={0}
    >
      <FontAwesomeIcon
        icon="ellipsis"
        size="1x"
      />
    </div>
  );
});

DropdownToggle.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DropdownToggle;
