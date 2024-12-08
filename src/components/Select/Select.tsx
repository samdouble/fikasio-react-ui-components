import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Select.scss';

export interface SelectProps {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  style?: React.CSSProperties;
  value?: string;
}

export function Select({
  className = '',
  defaultValue = undefined,
  disabled = false,
  name = undefined,
  onChange = () => undefined,
  options = [],
  style = {},
  value = undefined,
}: SelectProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();

  const handleChange = (e: SelectChangeEvent) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const BootstrapInput = styled(InputBase)(({ theme: inputTheme }) => ({
    '& .MuiInputBase-input': {
      backgroundColor: inputTheme.palette.background.paper,
      border: style?.border || '1px solid #cccccc',
      borderColor: style?.borderColor,
      borderRadius: style?.borderRadius || 0,
      borderStyle: style?.borderStyle,
      borderWidth: style?.borderWidth,
      padding: '6px 26px 6px 10px',
      position: 'relative',
      width: style?.minWidth,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
      },
    },
  }));

  return (
    <span
      className={classNames({
        'fikasio-select': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      {
        name && (
          <input
            name={name}
            type="hidden"
            value={currentValue}
          />
        )
      }
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <MUISelect
          disabled={disabled}
          input={<BootstrapInput />}
          onChange={handleChange}
          value={currentValue}
        >
          {
            options.map(option => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))
          }
        </MUISelect>
      </FormControl>
    </span>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,
};

export default Select;
