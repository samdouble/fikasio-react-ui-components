import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Success.scss';

library.add(faCheck);

export interface SuccessProps {
  children: string | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Success({
  children,
  className = '',
  style = {},
}: SuccessProps) {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-success': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      <FontAwesomeIcon
        icon="check"
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

export default Success;
