import React from 'react';
import PropTypes from 'prop-types';
import BootstrapButton from 'react-bootstrap/Button';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.scss';

export interface ActionButtonProps {
  children: JSX.Element,
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: 'submit';
}

export function ActionButton({
  children,
  className,
  onClick,
  style,
  type,
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
      onClick={onClick}
      style={{
        ...style,
      }}
      type={type}
      variant="primary"
    >
      {children}
    </BootstrapButton>
  );
}

ActionButton.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  type: PropTypes.string,
};
ActionButton.defaultProps = {
  children: undefined,
  className: '',
  onClick: () => undefined,
  style: {},
  type: undefined,
};

export default ActionButton;
