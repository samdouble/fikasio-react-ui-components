import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Button.scss';

export interface ActionButtonProps {
  children: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  style?: React.CSSProperties;
}

export function ActionButton({
  children,
  className = '',
  disabled = false,
  onClick = () => undefined,
  style = {},
}: ActionButtonProps) {
  const theme = useTheme();

  return (
    <button
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
      type="submit"
    >
      {children}
    </button>
  );
}

export default ActionButton;
