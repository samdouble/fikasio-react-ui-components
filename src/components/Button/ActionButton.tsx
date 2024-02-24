import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/Button';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.scss';

export interface ActionButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ActionButton({
  className,
  style,
}: ActionButtonProps) {
  const theme = useTheme();

  return (
    <BootstrapButton
      className={classNames({
        'fikasio-actionbutton': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        ...style,
      }}
      variant="primary"
    >
      Hello
    </BootstrapButton>
  );
}

ActionButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
ActionButton.defaultProps = {
  className: '',
  style: {},
};

export default ActionButton;
