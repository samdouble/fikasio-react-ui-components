import React from 'react';
import { Icon, IconProps } from './Icon';

export function PowerOffIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path d="M256 32c17.7 0 32 14.3 32 32v176c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32z" />
      <path
        fillRule="evenodd"
        d="M256 128c97.2 0 176 78.8 176 176S353.2 480 256 480 80 401.2 80 304 158.8 128 256 128zm0 56c-66.3 0-120 53.7-120 120s53.7 120 120 120 120-53.7 120-120-53.7-120-120-120z"
      />
    </Icon>
  );
}
