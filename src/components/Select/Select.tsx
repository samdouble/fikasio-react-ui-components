import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Select.scss';

library.add(faCaretDown);

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
  const [internalValue, setInternalValue] = useState<string>(
    hasDefaultValue ? defaultValue : options[0]?.value || '',
  );
  const currentValue = isControlled ? value : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const selectedOption = options.find(option => option.value === currentValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }
    if (!isControlled) {
      setInternalValue(selectedValue);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (options.length > 0) {
        const currentIndex = options.findIndex(opt => opt.value === currentValue);
        const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        handleSelect(options[nextIndex].value);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else if (options.length > 0) {
        const currentIndex = options.findIndex(opt => opt.value === currentValue);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        handleSelect(options[prevIndex].value);
      }
    }
  };

  return (
    <span
      ref={containerRef}
      className={classNames({
        'fikasio-select': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        'fikasio-select-disabled': disabled,
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
      <div
        className="fikasio-select-input-wrapper"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        style={{
          ...(style?.border && { border: style.border }),
          ...(style?.borderColor && { borderColor: style.borderColor }),
          ...(style?.borderRadius !== undefined && { borderRadius: style.borderRadius }),
          ...(style?.borderStyle && { borderStyle: style.borderStyle }),
          ...(style?.borderWidth && { borderWidth: style.borderWidth }),
          ...(style?.minWidth && { minWidth: style.minWidth }),
          ...(style?.width && { width: style.width }),
        }}
      >
        <div className="fikasio-select-input">
          {selectedOption?.label || ''}
        </div>
        <FontAwesomeIcon
          icon="caret-down"
          className="fikasio-select-icon"
        />
      </div>
      {isOpen && options.length > 0 && (
        <div
          ref={dropdownRef}
          className="fikasio-select-menu"
          style={{
            ...(style?.borderColor && { borderColor: style.borderColor }),
            ...(style?.borderRadius !== undefined && {
              borderBottomLeftRadius: style.borderRadius,
              borderBottomRightRadius: style.borderRadius,
            }),
          }}
        >
          {options.map(option => (
            <div
              key={option.value}
              className={classNames('fikasio-select-option', {
                'fikasio-select-option-selected': option.value === currentValue,
              })}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

export default Select;
