import React from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Table.css';

export interface TableProps {
  bordered?: boolean;
  children?: React.ReactNode;
  className?: string;
  hover?: boolean;
  responsive?: boolean;
  style?: React.CSSProperties;
}

export function Table({
  bordered = false,
  children,
  className = '',
  hover = false,
  responsive = false,
  style = {},
}: TableProps) {
  const theme = useTheme();

  const table = (
    <table
      className={classNames({
        'fikasio-content-table': true,
        'fikasio-content-table-bordered': bordered,
        'fikasio-content-table-hover': hover,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      {children}
    </table>
  );

  return responsive
    ? (
      <div className="fikasio-table-responsive">
        {table}
      </div>
    )
    : table;
}

export default Table;
