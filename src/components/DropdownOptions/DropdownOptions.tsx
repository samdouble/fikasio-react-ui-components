import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './DropdownOptions.scss';

library.add(faTimes, faEllipsis);

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
  className = '',
  options = [],
  style = {},
}: DropdownOptionsProps) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={classNames({
        'fikasio-dropdownOptions': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={{
        position: 'relative',
        ...style,
      }}
    >
      <div
        className="fikasio-dropdownOptions-toggle"
        onClick={handleToggle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <FontAwesomeIcon
          icon="ellipsis"
          size="1x"
        />
      </div>
      {isOpen && options.length > 0 && (
        <div ref={dropdownRef} className="fikasio-dropdownOptions-menu">
          {options.map((option, index) => (
            <div
              key={`${option.type}-${index}`}
              className="fikasio-dropdownOptions-item"
              onClick={() => handleOptionClick(option.onClick)}
            >
              <FontAwesomeIcon
                icon="times"
                className="fikasio-dropdownOptions-icon"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownOptions;
