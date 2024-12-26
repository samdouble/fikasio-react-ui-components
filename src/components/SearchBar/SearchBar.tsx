import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './SearchBar.scss';

library.add(faSearch);

export interface SearchBarProps {
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  onSubmit?: () => void;
  options?: string[];
  placeholder?: string;
  style?: React.CSSProperties;
  value?: string;
}

export function SearchBar({
  className = '',
  defaultValue = undefined,
  onChange = () => undefined,
  onSelect = () => undefined,
  onSubmit = () => undefined,
  options = [],
  placeholder = '',
  style = {},
  value = undefined,
}: SearchBarProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string | undefined>(
    hasDefaultValue ? defaultValue : undefined,
  );
  const currentValue = isControlled ? value : internalValue;

  const theme = useTheme();
  const [internalOptions, setInternalOptions] = useState(options);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    setInternalOptions(options.filter(option => option.toLowerCase().includes(newValue.toLowerCase())));
  };

  return (
    <div
      className={classNames({
        'fikasio-searchbar': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        minWidth: 200,
        ...style,
      }}
    >
      <Autocomplete
        freeSolo
        onChange={(_e, newValue) => onSelect(newValue ?? '')}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
        onInputChange={(_e, newValue) => handleChange(newValue ?? '')}
        options={internalOptions}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={placeholder}
            value={currentValue}
          />
        )}
        style={{
          paddingLeft: 22,
        }}
      />
      <FontAwesomeIcon
        icon="magnifying-glass"
        size="1x"
        style={{
          bottom: 32,
          margin: 5,
          marginLeft: 10,
          position: 'relative',
        }}
      />
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.string,
};

export default SearchBar;
