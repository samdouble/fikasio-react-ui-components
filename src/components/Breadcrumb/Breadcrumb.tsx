import React from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  href?: string;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

const EMPTY_ITEMS: BreadcrumbItem[] = [];

export interface BreadcrumbProps {
  className?: string;
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Breadcrumb({
  className = '',
  items = EMPTY_ITEMS,
  separator = '/',
  style = {},
}: BreadcrumbProps) {
  const theme = useTheme();

  const renderCrumb = (item: BreadcrumbItem, isCurrent: boolean) => {
    if (isCurrent) {
      return (
        <span
          aria-current="page"
          className="fikasio-breadcrumb-current"
        >
          {item.label}
        </span>
      );
    }

    if (item.href) {
      return (
        <a
          className="fikasio-breadcrumb-link"
          href={item.href}
          onClick={item.onClick}
        >
          {item.label}
        </a>
      );
    }

    if (item.onClick) {
      return (
        <button
          className="fikasio-breadcrumb-link"
          onClick={item.onClick}
          type="button"
        >
          {item.label}
        </button>
      );
    }

    return (
      <span className="fikasio-breadcrumb-text">
        {item.label}
      </span>
    );
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={classNames({
        'fikasio-breadcrumb': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      <ol className="fikasio-breadcrumb-list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className="fikasio-breadcrumb-item"
            >
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="fikasio-breadcrumb-separator"
                >
                  {separator}
                </span>
              )}
              {renderCrumb(item, isCurrent)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
