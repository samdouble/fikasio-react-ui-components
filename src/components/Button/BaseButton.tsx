import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Button.css';

export type ButtonType = 'button' | 'reset' | 'submit';

export interface SharedButtonProps {
  ariaLabel?: string;
  children: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  type?: ButtonType;
}

interface BaseButtonProps extends SharedButtonProps {
  active?: boolean;
  defaultType: ButtonType;
  outline?: boolean;
  variantClass: string;
}

export function BaseButton({
  active = false,
  ariaLabel = undefined,
  children,
  className = '',
  defaultType,
  disabled = false,
  onClick = () => undefined,
  outline = false,
  size = 'md',
  style = {},
  type,
  variantClass,
}: BaseButtonProps) {
  const theme = useTheme();

  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={active ? true : undefined}
      className={classNames({
        [variantClass]: true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        'fikasio-button-sm': size === 'sm',
        'fikasio-button-active': active,
        'fikasio-button-outline': outline,
        ...convertClassNameToObj(className),
      })}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...style,
      }}
      type={type ?? defaultType}
    >
      {children}
    </button>
  );
}

export default BaseButton;
