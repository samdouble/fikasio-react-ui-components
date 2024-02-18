import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './SearchBar.scss';

library.add(faSearch);

export interface SearchBarProps {
  className?: string;
  style?: React.CSSProperties;
}

export function SearchBar({
  className,
  style,
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <div
      className={classNames({
        'fikasio-searchbar': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      <FontAwesomeIcon
        icon="search"
        size="1x"
        style={{
          margin: 5,
          marginLeft: 10,
        }}
      />
      {
        <input
          type="text"
          style={{
            border: 'none',
            marginRight: 50,
            outline: 'none',
            paddingLeft: 10,
            position: 'relative',
            top: -5,
          }}
        />
      }
      {
        /*
          <Autosuggest
            getSuggestionValue={suggestion => suggestion.name}
            inputProps={{
              onChange,
              value,
            }}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            renderSuggestion={renderSuggestion}
            suggestions={suggestions}
          />
        */
      }
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
SearchBar.defaultProps = {
  className: '',
  style: {},
};

export default SearchBar;
