import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { ActionButton } from '../Button/ActionButton';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Selector.css';

const EMPTY_OPTIONS: string[] = [];

export interface SelectorProps {
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: string[];
  render?: (value?: string) => React.ReactNode;
  style?: React.CSSProperties;
  value?: string;
}

export function Selector({
  className = '',
  onChange = () => undefined,
  options = EMPTY_OPTIONS,
  render = undefined,
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
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [prevOptions, setPrevOptions] = useState(options);
  const containerRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

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

  if (options !== prevOptions) {
    setPrevOptions(options);
    setHighlightedIndex(null);
  }

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    setIsOpen(false);
    setHighlightedIndex(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen && options.length > 0) {
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
        return prev < options.length - 1 ? prev + 1 : prev;
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
      if (highlightedIndex !== null && highlightedIndex < options.length) {
        handleChange(options[highlightedIndex]);
      } else if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } else if (e.key === ' ') {
      e.preventDefault();
      if (isOpen && highlightedIndex !== null && highlightedIndex < options.length) {
        handleChange(options[highlightedIndex]);
      } else {
        setIsOpen(!isOpen);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setHighlightedIndex(null);
    }
  };

  return (
    <span
      ref={containerRef}
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
        render ? (
          <div
            ref={triggerRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            {render(currentValue)}
          </div>
        ) : (
          <div
            ref={triggerRef}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <ActionButton>
              {currentValue}
            </ActionButton>
          </div>
        )
      }
      {isOpen && options.length > 0 && (
        <div ref={dropdownRef} className="fikasio-selector-menu" role="listbox">
          {options.map((option, index) => (
            <div
              key={option}
              className={classNames('fikasio-selector-option', {
                'fikasio-selector-option-highlighted': index === highlightedIndex,
              })}
              onClick={() => handleChange(option)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleChange(option);
                }
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={index === highlightedIndex}
              tabIndex={-1}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

export default Selector;
