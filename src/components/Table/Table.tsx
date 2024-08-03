import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import usePrevious from 'use-previous';
import { Checkbox } from '../Checkbox/Checkbox';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.scss';

library.add(faCaretUp);

interface Column {
  name?: string;
  onClick?: (row: Row) => void;
  render?: (row: Row) => JSX.Element;
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

type Row = any;

export interface TableProps {
  className?: string;
  columns?: (CellColumn | NumberingColumn | OptionsColumn)[];
  isRowChecked?: (row: any) => boolean;
  isSelectable?: boolean;
  onRowClick?: (row: any) => void;
  options?: (row: Row) => JSX.Element;
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
  const prevOrderedBy = usePrevious(orderedBy);

  const theme = useTheme();

  useEffect(() => {
    setOrderedRows([...(rows || [])]);
  }, [rows]);

  useEffect(() => {
    const newOrderDirection = (prevOrderedBy && orderedBy && prevOrderedBy.name === orderedBy.name)
      ? 'DESC'
      : 'ASC';
    setOrderDirection(newOrderDirection);
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
    <BootstrapTable
      className={classNames({
        'fikasio-table': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      bordered
      hover
      responsive
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
                      key={column.name}
                      onClick={() => setOrderedBy(column)}
                      style={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {column.name}
                      <span
                        className="sortable-column-buttons"
                      >
                        <FontAwesomeIcon
                          icon="caret-up"
                          size="1x"
                        />
                      </span>
                    </th>
                  );
                }
                if (column.type === 'numbering') {
                  return (
                    <th
                      key={column.name}
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
                      key={column.name}
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
                            key={column.name}
                          >
                            {
                              column.render
                                ? column.render(row)
                                : row[column.property]
                            }
                          </td>
                        );
                      }
                      if (column.type === 'numbering') {
                        return (
                          <td
                            key={column.name}
                          >
                            {index + 1}
                          </td>
                        );
                      }
                      if (column.type === 'options') {
                        return (
                          <td
                            className="itemStaticColumn-right"
                            key={column.name}
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
    </BootstrapTable>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onClick: PropTypes.func,
      render: PropTypes.func,
      type: PropTypes.string,
    }),
  ),
  isRowChecked: PropTypes.func,
  isSelectable: PropTypes.func,
  onRowClick: PropTypes.func,
  options: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Table;
