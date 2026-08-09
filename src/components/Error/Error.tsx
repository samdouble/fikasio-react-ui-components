import React from 'react';
import classNames from 'classnames';
import { TriangleExclamationIcon } from '../../icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Error.css';

export interface ErrorProps {
  children: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Error({
  children,
  className = '',
  style = {},
}: ErrorProps) {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-error': true,
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

export default Error;
