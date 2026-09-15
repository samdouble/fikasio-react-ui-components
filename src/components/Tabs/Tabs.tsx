import React, { useId, useRef, useState } from 'react';
import classNames from 'classnames';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Tabs.css';

export interface TabsOption {
  content?: React.ReactNode;
  disabled?: boolean;
  label: string;
  value: string;
}

const EMPTY_OPTIONS: TabsOption[] = [];

export interface TabsProps {
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: TabsOption[];
  style?: React.CSSProperties;
  value?: string;
}

export function Tabs({
  className = '',
  defaultValue = undefined,
  onChange = () => undefined,
  options = EMPTY_OPTIONS,
  style = {},
  value = undefined,
}: TabsProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const firstEnabledValue = options.find(option => !option.disabled)?.value || '';
  const [internalValue, setInternalValue] = useState<string>(
    hasDefaultValue ? defaultValue : firstEnabledValue,
  );
  const currentValue = isControlled ? value : internalValue;
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const instanceId = useId();
  const theme = useTheme();

  const selectedOption = options.find(option => option.value === currentValue);
  const enabledOptions = options.filter(option => !option.disabled);

  const handleSelect = (selectedValue: string) => {
    const option = options.find(opt => opt.value === selectedValue);
    if (!option || option.disabled) {
      return;
    }
    if (onChange) {
      onChange(selectedValue);
    }
    if (!isControlled) {
      setInternalValue(selectedValue);
    }
  };

  const focusTab = (tabValue: string) => {
    tabRefs.current[tabValue]?.focus();
  };

  const getAdjacentValue = (direction: 1 | -1) => {
    if (enabledOptions.length === 0) {
      return currentValue;
    }
    const currentIndex = enabledOptions.findIndex(option => option.value === currentValue);
    if (currentIndex === -1) {
      return enabledOptions[0].value;
    }
    const nextIndex = (currentIndex + direction + enabledOptions.length) % enabledOptions.length;
    return enabledOptions[nextIndex].value;
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    let nextValue: string | undefined;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextValue = getAdjacentValue(1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextValue = getAdjacentValue(-1);
    } else if (event.key === 'Home') {
      nextValue = enabledOptions[0]?.value;
    } else if (event.key === 'End') {
      nextValue = enabledOptions[enabledOptions.length - 1]?.value;
    }

    if (nextValue) {
      event.preventDefault();
      handleSelect(nextValue);
      focusTab(nextValue);
    }
  };

  return (
    <div
      className={classNames({
        'fikasio-tabs': true,
        'fikasio-theme-dark': theme === 'dark',
        'fikasio-theme-light': theme === 'light',
        ...convertClassNameToObj(className),
      })}
      style={style}
    >
      <div
        className="fikasio-tabs-list"
        role="tablist"
      >
        {options.map(option => {
          const isSelected = option.value === currentValue;
          const tabId = `${instanceId}-tab-${option.value}`;
          const panelId = `${instanceId}-panel-${option.value}`;

          return (
            <button
              key={option.value}
              aria-controls={option.content ? panelId : undefined}
              aria-disabled={option.disabled || undefined}
              aria-selected={isSelected}
              className={classNames('fikasio-tabs-tab', {
                'fikasio-tabs-tab-disabled': option.disabled,
                'fikasio-tabs-tab-selected': isSelected,
              })}
              disabled={option.disabled}
              id={tabId}
              onClick={() => handleSelect(option.value)}
              onKeyDown={handleTabKeyDown}
              ref={element => {
                tabRefs.current[option.value] = element;
              }}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {selectedOption?.content !== undefined && (
        <div
          aria-labelledby={`${instanceId}-tab-${selectedOption.value}`}
          className="fikasio-tabs-panel"
          id={`${instanceId}-panel-${selectedOption.value}`}
          role="tabpanel"
        >
          {selectedOption.content}
        </div>
      )}
    </div>
  );
}

export default Tabs;
