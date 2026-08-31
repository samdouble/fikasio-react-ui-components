import React from 'react';
import { Icon, IconProps } from './Icon';

export function DownloadIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path d="M256 64c17.7 0 32 14.3 32 32v186.7l54.6-54.6c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-112 112c-12.5 12.5-32.8 12.5-45.3 0l-112-112c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 282.7V96c0-17.7 14.3-32 32-32zM128 416h256c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
    </Icon>
  );
}
