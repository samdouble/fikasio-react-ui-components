import React from 'react';
import classNames from 'classnames';
import { TriangleExclamationIcon } from '../../icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Warning.css';

export interface WarningProps {
  children: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Warning({
  children,
  className = '',
  style = {},
}: WarningProps) {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-warning': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      <TriangleExclamationIcon
        size="lg"
        style={{
          fontSize: 16,
          marginRight: 10,
        }}
      />
      {children}
    </div>
  );
}

export default Warning;
