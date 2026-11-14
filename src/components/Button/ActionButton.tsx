import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Button.css';

export interface ActionButtonProps {
  ariaLabel?: string;
  children: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  style?: React.CSSProperties;
  type?: 'button' | 'reset' | 'submit';
}

export function ActionButton({
  ariaLabel = undefined,
  children,
  className = '',
  disabled = false,
  onClick = () => undefined,
  style = {},
  type = 'submit',
}: ActionButtonProps) {
  const theme = useTheme();

  return (
    <button
      aria-label={ariaLabel}
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
    >
      {children}
    </button>
  );
}

export default ActionButton;
