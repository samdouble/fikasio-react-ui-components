import React from 'react';
import { Icon, IconProps } from './Icon';

export function ThIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 512 512" {...props}>
      <path d="M32 32h128v128H32zm160 0h128v128H192zm160 0h128v128H352zM32 192h128v128H32zm160 0h128v128H192zm160 0h128v128H352zM32 352h128v128H32zm160 0h128v128H192zm160 0h128v128H352z" />
    </Icon>
  );
}
