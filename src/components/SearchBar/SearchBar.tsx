import React from 'react';
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
  options?: string[];
  placeholder?: string;
  style?: React.CSSProperties;
}

export function SearchBar({
  className = '',
  options = [],
  placeholder = '',
  style = {},
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <>
      <Autocomplete
        className={classNames({
          'fikasio-searchbar': true,
          'fikasio-theme-dark': theme === 'dark',
          'fikasio-theme-light': theme === 'light',
          ...convertClassNameToObj(className),
        })}
        freeSolo
        options={options}
        renderInput={params => (
          <TextField
            {...params}
            placeholder={placeholder}
          />
        )}
        style={{
          outline: 'none',
          paddingLeft: 22,
          position: 'relative',
          top: -5,
          ...style,
        }}
      />
      <FontAwesomeIcon
        icon="search"
        size="1x"
        style={{
          bottom: 36,
          margin: 5,
          marginLeft: 10,
          position: 'relative',
        }}
      />
    </>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SearchBar;
