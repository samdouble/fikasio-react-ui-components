import React from 'react';
import {
  ArchiveIcon,
  BarsIcon,
  BellIcon,
  BookIcon,
  BullseyeIcon,
  CalendarAltIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
  CheckSquareIcon,
  ClockIcon,
  CogIcon,
  CopyIcon,
  DownloadIcon,
  EditIcon,
  EllipsisIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MessageIcon,
  PlusIcon,
  PowerOffIcon,
  ProjectDiagramIcon,
  ShapesIcon,
  SitemapIcon,
  SlidersIcon,
  StopwatchIcon,
  ThIcon,
  TimesIcon,
  UserIcon,
} from '../../icons';
import type { IconProps as SvgIconProps } from '../../icons';

const ICONS = {
  archive: ArchiveIcon,
  bars: BarsIcon,
  bell: BellIcon,
  book: BookIcon,
  bullseye: BullseyeIcon,
  'calendar-alt': CalendarAltIcon,
  'caret-left': CaretLeftIcon,
  'caret-right': CaretRightIcon,
  check: CheckIcon,
  'check-square': CheckSquareIcon,
  clock: ClockIcon,
  cog: CogIcon,
  copy: CopyIcon,
  download: DownloadIcon,
  edit: EditIcon,
  ellipsis: EllipsisIcon,
  list: ListIcon,
  'magnifying-glass': MagnifyingGlassIcon,
  message: MessageIcon,
  plus: PlusIcon,
  'power-off': PowerOffIcon,
  'project-diagram': ProjectDiagramIcon,
  shapes: ShapesIcon,
  sitemap: SitemapIcon,
  sliders: SlidersIcon,
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
