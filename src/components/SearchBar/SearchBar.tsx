import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (currentValue === undefined || currentValue === '') {
      return options;
    }
    return options.filter(option =>
      option.toLowerCase().includes(currentValue.toLowerCase()),
    );
  }, [currentValue, options]);

  useEffect(() => {
    setHighlightedIndex(null);
  }, [filteredOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    setIsOpen(true);
  };

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    if (!isControlled) {
      setInternalValue(selectedValue);
    }
    setIsOpen(false);
    setHighlightedIndex(null);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (highlightedIndex !== null && dropdownRef.current) {
      const optionElement = dropdownRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (optionElement && typeof optionElement.scrollIntoView === 'function') {
        optionElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && filteredOptions.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
        return;
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        if (prev === null) {
          return 0;
        }
        return prev < filteredOptions.length - 1 ? prev + 1 : prev;
      });
      setIsOpen(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => {
        if (prev === null) {
          return 0;
        }
        return prev > 0 ? prev - 1 : prev;
      });
      setIsOpen(true);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex !== null && highlightedIndex < filteredOptions.length) {
        handleSelect(filteredOptions[highlightedIndex]);
      } else {
        onSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(null);
      inputRef.current?.blur();
    }
  };

  const handleInputFocus = () => {
    if (filteredOptions.length > 0) {
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={classNames({
        'fikasio-searchbar': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        minWidth: 200,
        position: 'relative',
        ...style,
      }}
    >
      <div className="fikasio-searchbar-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="fikasio-searchbar-input"
          placeholder={placeholder}
          value={currentValue ?? ''}
          onChange={e => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
        />
        <FontAwesomeIcon
          icon="magnifying-glass"
          size="1x"
          className="fikasio-searchbar-icon"
        />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div ref={dropdownRef} className="fikasio-searchbar-dropdown">
          {filteredOptions.map((option, index) => (
            <div
              key={option}
              className={classNames('fikasio-searchbar-option', {
                'fikasio-searchbar-option-highlighted': index === highlightedIndex,
              })}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
