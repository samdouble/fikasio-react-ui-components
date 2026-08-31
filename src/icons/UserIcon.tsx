import React from 'react';
import { Icon, IconProps } from './Icon';

export function UserIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path d="M256 48a88 88 0 1 1 0 176 88 88 0 1 1 0-176zM96 464v-32c0-88.4 71.6-160 160-160s160 71.6 160 160v32c0 8.8-7.2 16-16 16H112c-8.8 0-16-7.2-16-16z" />
    </Icon>
  );
}
