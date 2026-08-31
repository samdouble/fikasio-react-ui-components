import React from 'react';
import { Icon, IconProps } from './Icon';

export function ListIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path d="M96 128a32 32 0 1 1-64 0 32 32 0 1 1 64 0zM160 112h288c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 256a32 32 0 1 1-64 0 32 32 0 1 1 64 0zM160 240h288c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 384a32 32 0 1 1-64 0 32 32 0 1 1 64 0zM160 368h288c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </Icon>
  );
}
