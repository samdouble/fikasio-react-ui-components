import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: '1x' | 'lg';
}

const sizeToEm: Record<NonNullable<IconProps['size']>, string> = {
  '1x': '1em',
  lg: '1.33333em',
};

export function Icon({
  children,
  className,
  size = '1x',
  style,
  viewBox,
  ...rest
}: IconProps & { viewBox: string; children: React.ReactNode }) {
  const em = sizeToEm[size];
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      focusable="false"
      height={em}
      style={{
        display: 'inline-block',
        overflow: 'visible',
        verticalAlign: '-0.125em',
        ...style,
      }}
      viewBox={viewBox}
      width={em}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
}
