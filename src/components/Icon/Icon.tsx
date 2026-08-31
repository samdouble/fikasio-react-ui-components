import React from 'react';
import {
  BookIcon,
  CalendarAltIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CogIcon,
  DownloadIcon,
  ListIcon,
  PowerOffIcon,
  SitemapIcon,
  ThIcon,
  TimesIcon,
  UserIcon,
} from '../../icons';
import type { IconProps as SvgIconProps } from '../../icons';

const ICONS = {
  book: BookIcon,
  'calendar-alt': CalendarAltIcon,
  'caret-left': CaretLeftIcon,
  'caret-right': CaretRightIcon,
  cog: CogIcon,
  download: DownloadIcon,
  list: ListIcon,
  'power-off': PowerOffIcon,
  sitemap: SitemapIcon,
  th: ThIcon,
  times: TimesIcon,
  user: UserIcon,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps extends SvgIconProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const SvgIcon = ICONS[name];
  return <SvgIcon {...props} />;
}

export default Icon;
