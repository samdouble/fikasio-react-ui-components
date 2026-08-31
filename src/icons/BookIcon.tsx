import React from 'react';
import { Icon, IconProps } from './Icon';

export function BookIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path d="M80 64c-17.7 0-32 14.3-32 32v320c0 17.7 14.3 32 32 32h48V64H80zm80 0h272c17.7 0 32 14.3 32 32v320c0 17.7-14.3 32-32 32H160V64z" />
    </Icon>
  );
}
