import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import DropdownToggle from './DropdownToggle';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DropdownOptions.scss';

library.add(faTimes);

export interface DropdownOptionsProps {
  className?: string;
  options?: {
    label: string;
    onClick?: () => void;
    type: 'delete';
  }[];
  style?: React.CSSProperties;
}

export function DropdownOptions({
  className,
  options,
  style,
}: DropdownOptionsProps) {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-dropdownOptions': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      <Dropdown
        style={{
          position: 'static',
        }}
      >
        <Dropdown.Toggle as={DropdownToggle} />
        <Dropdown.Menu>
          {
            (options || [])
              .map(option => (
                <Dropdown.Item
                  key={option.type}
                  onClick={option.onClick}
                >
                  <FontAwesomeIcon
                    icon="times"
                    style={{
                      color: 'red',
                      marginRight: 10,
                      width: 25,
                    }}
                  />
                  {option.label}
                </Dropdown.Item>
              ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

DropdownOptions.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
      type: PropTypes.string,
    }),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
DropdownOptions.defaultProps = {
  className: '',
  options: [],
  style: {},
};

export default DropdownOptions;
