import React, { useState } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import defaultImage from './user.png';
import './UserAvatar.css';

export interface UserAvatarProps {
  alt?: string;
  className?: string;
  previewSrc?: string | null;
  size?: number;
  src?: string | null;
  style?: React.CSSProperties;
}

export function UserAvatar({
  alt = 'User profile',
  className = '',
  previewSrc = null,
  size = 32,
  src = null,
  style = {},
}: UserAvatarProps) {
  const theme = useTheme();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const pictureSrc = previewSrc
    || (src && failedSrc !== src ? src : defaultImage);

  return (
    <img
      alt={alt}
      className={classNames({
        'fikasio-user-avatar': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      height={size}
      onError={() => {
        if (src && !previewSrc && failedSrc !== src) {
          setFailedSrc(src);
        }
      }}
      src={pictureSrc}
      style={style}
      width={size}
    />
  );
}

export default UserAvatar;
