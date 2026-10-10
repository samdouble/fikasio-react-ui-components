import React from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import loading from './loading.gif';
import './LoadingGif.css';

export function LoadingGif() {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-loading-gif': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
      })}
    >
      <img
        alt="loading"
        className="fikasio-loading-gif-image"
        src={loading}
        width="200"
      />
    </div>
  );
}

export default LoadingGif;
