import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import { CaretUpIcon } from '../../icons';
import { Checkbox } from '../Checkbox/Checkbox';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Table.css';

interface Column {
  name?: string;
  onClick?: (row: Row) => void;
  render?: (row: Row) => React.ReactNode;
  type: 'cell' | 'numbering' | 'options';
}

interface CellColumn extends Column {
  isSortable?: boolean;
  property: string;
  type: 'cell';
  value: (row: Row) => (string | number | boolean);
}

interface NumberingColumn extends Column {
  type: 'numbering';
}

interface OptionsColumn extends Column {
  type: 'options';
}

type Row = Record<string, unknown>;

export interface TableProps {
  className?: string;
  columns?: (CellColumn | NumberingColumn | OptionsColumn)[];
  isRowChecked?: (row: Row) => boolean;
  isSelectable?: boolean;
  onRowClick?: (row: Row) => void;
  options?: (row: Row) => React.ReactNode;
  rows?: Row[];
  style?: React.CSSProperties;
}

export function Table({
  className = '',
  columns = [],
  isRowChecked = () => false,
  isSelectable = true,
  onRowClick = () => undefined,
  options = () => <div />,
  rows = [],
  style = {},
}: TableProps) {
  const [orderedBy, setOrderedBy] = useState<CellColumn | null>(null);
  const [orderDirection, setOrderDirection] = useState<string>('ASC');
  const [orderedRows, setOrderedRows] = useState(rows ? [...rows] : []);
  const prevRowsRef = useRef(rows);
  const prevOrderedByRef = useRef<CellColumn | null>(null);

  const theme = useTheme();

  useEffect(() => {
    if (!isEqual(rows, prevRowsRef.current)) {
      setOrderedRows([...(rows || [])]);
    }
    prevRowsRef.current = rows;
  }, [rows]);

  useEffect(() => {
    const prevOrderedBy = prevOrderedByRef.current;
    const newOrderDirection = (prevOrderedBy && orderedBy && prevOrderedBy.name === orderedBy.name)
      ? 'DESC'
      : 'ASC';
    setOrderDirection(newOrderDirection);
    prevOrderedByRef.current = orderedBy;
  }, [orderedBy, rows]);

  useEffect(() => {
    if (rows && orderedBy) {
      const newOrderedRows = [...rows]
        .sort((rowA, rowB) => {
          if (orderDirection === 'ASC') {
            return orderedBy.value(rowA) < orderedBy.value(rowB) ? -1 : 1;
          }
          return orderedBy.value(rowA) > orderedBy.value(rowB) ? -1 : 1;
        });
      setOrderedRows(newOrderedRows);
    }
  }, [orderDirection, orderedBy, rows]);

  return (
    <div className="fikasio-table-wrapper">
      <table
        className={classNames({
          'fikasio-table': true,
          'fikasio-theme-dark': theme === 'dark',
          'fikasio-theme-light': theme === 'light',
          ...convertClassNameToObj(className),
        })}
        style={{
          ...style,
        }}
      >
        <thead>
          <tr>
            {
              isSelectable && (
                <th
                  style={{
                    left: 0,
                    position: 'sticky',
                    textAlign: 'center',
                    width: 35,
                  }}
                />
              )
            }
            {
              columns
                .map(column => {
                  if (column.type === 'cell') {
                    return (
                      <th
                        className={classNames({
                          'sortable-column': column.isSortable,
                        })}
                        key={`header-${column.name}`}
                        onClick={() => setOrderedBy(column)}
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {column.name}
                        <span
                          className="sortable-column-buttons"
                        >
                          <CaretUpIcon
                            size="1x"
                          />
                        </span>
                      </th>
                    );
                  }
                  if (column.type === 'numbering') {
                    return (
                      <th
                        key={`header-${column.name}`}
                        style={{
                          width: 30,
                        }}
                      />
                    );
                  }
                  if (column.type === 'options') {
                    return (
                      <th
                        className="itemStaticColumn-right"
                        key={`header-${column.name}`}
                        style={{
                          textAlign: 'center',
                          width: 35,
                        }}
                      />
                    );
                  }
                  return null;
                })
            }
          </tr>
        </thead>
        <tbody>
          {
            orderedRows
              .map((row, index) => (
                <tr
                  className="itemRow"
                  key={JSON.stringify(row)}
                >
                  {
                    isSelectable && (
                      <td
                        style={{
                          left: 0,
                          position: 'sticky',
                        }}
                      >
                        <Checkbox
                          defaultIsChecked={isRowChecked && isRowChecked(row)}
                          onClick={() => {
                            if (onRowClick) {
                              onRowClick(row);
                            }
                          }}
                          style={{
                            margin: '0 -2px',
                          }}
                        />
                      </td>
                    )
                  }
                  {
                    columns
                      .map(column => {
                        if (column.type === 'cell') {
                          return (
                            <td
                              className="itemRow_field"
                              key={`cell-${column.name}-row-${JSON.stringify(row)}`}
                            >
                              {
                                column.render
                                  ? column.render(row)
                                  : row[column.property] as React.ReactNode
                              }
                            </td>
                          );
                        }
                        if (column.type === 'numbering') {
                          return (
                            <td
                              key={`cell-${column.name}-row-${JSON.stringify(row)}`}
                            >
                              {index + 1}
                            </td>
                          );
                        }
                        if (column.type === 'options') {
                          return (
                            <td
                              className="itemStaticColumn-right"
                              key={`cell-${column.name}-row-${JSON.stringify(row)}`}
                            >
                              {options(row)}
                            </td>
                          );
                        }
                        return null;
                      })
                  }
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
