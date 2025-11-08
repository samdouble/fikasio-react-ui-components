import React from 'react';
import classNames from 'classnames';
import BootstrapAlert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Error.scss';

library.add(faTriangleExclamation);

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
      <BootstrapAlert
        variant="danger"
      >
        <FontAwesomeIcon
          icon="triangle-exclamation"
          size="lg"
          style={{
            fontSize: 16,
            marginRight: 10,
          }}
        />
        {children}
      </BootstrapAlert>
    </div>
  );
}

export default Error;
