import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ActionButton } from '../Button/ActionButton';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Selector.scss';

export interface SelectorProps {
  className?: string;
  Component?: React.ReactElement;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: string[];
  style?: React.CSSProperties;
  value?: string;
}

export function Selector({
  className = '',
  Component = undefined,
  onChange = () => undefined,
  options = [],
  style = {},
  defaultValue = options[0],
  value = undefined,
}: SelectorProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span
      className={classNames({
        'fikasio-selector': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        ...style,
      }}
    >
      {
        Component ? (
          <div
            onClick={handleClick}
            role="presentation"
          >
            {Component}
          </div>
        ) : (
          <ActionButton
            onClick={handleClick}
          >
            {currentValue}
          </ActionButton>
        )
      }
      {
        options.length > 0
          ? (
            <Menu
              anchorEl={anchorEl}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              open={open}
              onClose={handleClose}
            >
              {
                options.map(option => (
                  <MenuItem
                    key={option}
                    onClick={_e => handleChange(option)}
                  >
                    {option}
                  </MenuItem>
                ))
              }
            </Menu>
          ) : null
      }
    </span>
  );
}

Selector.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.element,
  options: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Selector;
