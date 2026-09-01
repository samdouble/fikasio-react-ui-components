import React from 'react';
import {
  ArchiveIcon,
  BookIcon,
  CalendarAltIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  CogIcon,
  CopyIcon,
  DownloadIcon,
  EditIcon,
  ListIcon,
  MessageIcon,
  PlusIcon,
  PowerOffIcon,
  SitemapIcon,
  StopwatchIcon,
  ThIcon,
  TimesIcon,
  UserIcon,
} from '../../icons';
import type { IconProps as SvgIconProps } from '../../icons';

const ICONS = {
  archive: ArchiveIcon,
  book: BookIcon,
  'calendar-alt': CalendarAltIcon,
  'caret-left': CaretLeftIcon,
  'caret-right': CaretRightIcon,
  check: CheckIcon,
  cog: CogIcon,
  copy: CopyIcon,
  download: DownloadIcon,
  edit: EditIcon,
  list: ListIcon,
  message: MessageIcon,
  plus: PlusIcon,
  'power-off': PowerOffIcon,
  sitemap: SitemapIcon,
  stopwatch: StopwatchIcon,
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
