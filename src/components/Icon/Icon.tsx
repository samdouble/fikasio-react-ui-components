import React from 'react';
import {
  ArchiveIcon,
  BarsIcon,
  BellIcon,
  BookIcon,
  BullseyeIcon,
  CalendarAltIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
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
  SquareIcon,
  StopwatchIcon,
  ThIcon,
  TimesIcon,
  TriangleExclamationIcon,
  UserIcon,
  XmarkIcon,
} from '../../icons';
import type { IconProps as SvgIconProps } from '../../icons';

const ICONS = {
  archive: ArchiveIcon,
  bars: BarsIcon,
  bell: BellIcon,
  book: BookIcon,
  bullseye: BullseyeIcon,
  'calendar-alt': CalendarAltIcon,
  'caret-down': CaretDownIcon,
  'caret-left': CaretLeftIcon,
  'caret-right': CaretRightIcon,
  'caret-up': CaretUpIcon,
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
  square: SquareIcon,
  stopwatch: StopwatchIcon,
  th: ThIcon,
  times: TimesIcon,
  'triangle-exclamation': TriangleExclamationIcon,
  user: UserIcon,
  xmark: XmarkIcon,
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
