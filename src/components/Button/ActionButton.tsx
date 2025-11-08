import React, { SyntheticEvent } from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Button.scss';

export interface ActionButtonProps {
  children: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  style?: React.CSSProperties;
  type?: 'submit';
}

export function ActionButton({
  children,
  className = '',
  disabled = false,
  onClick = () => undefined,
  style = {},
  type = undefined,
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
      disabled={disabled}
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

export default ActionButton;
