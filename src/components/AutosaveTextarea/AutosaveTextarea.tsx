import React, { useState } from 'react';
import classNames from 'classnames';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import useTimeout from 'use-timeout';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './style.scss';

export interface AutosaveTextareaProps {
  className?: string;
  defaultValue?: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSave?: (value: string) => void;
  ref?: React.Ref<any>,
  style?: React.CSSProperties;
  useContentEditableDiv?: boolean;
  value?: string;
}

function AutosaveTextarea({
  className = '',
  defaultValue = undefined,
  name = undefined,
  onBlur = () => undefined,
  onChange = () => undefined,
  onFocus = () => undefined,
  onKeyDown = () => undefined,
  onKeyUp = () => undefined,
  onSave = () => undefined,
  ref = undefined,
  style = {},
  useContentEditableDiv = true,
  value = undefined,
}: AutosaveTextareaProps) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string>(
    hasDefaultValue ? defaultValue.toString() : '',
  );
  const currentValue = isControlled ? value : internalValue;

  const [delay, setDelay] = useState<number | null>(null);

  const theme = useTheme();

  const handleChange = (newValue: string) => {
    setDelay(1000);
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const saveValue = () => {
    if (currentValue !== '') {
      onSave(currentValue);
    }
  };

  useTimeout(() => {
    saveValue();
    setDelay(null);
  }, delay);

  return useContentEditableDiv
    ? (
      <>
        <input
          name={name}
          type="hidden"
          value={currentValue}
        />
        <ContentEditable
          className={classNames({
            'fikasio-textarea': true,
            'fikasio-theme-dark': theme === 'dark',
            'fikasio-theme-light': theme === 'light',
            ...convertClassNameToObj(className),
          })}
          html={currentValue}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => onBlur && onBlur(e)}
          onChange={(e: ContentEditableEvent) => handleChange(e.target.value)}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => onFocus && onFocus(e)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyDown && onKeyDown(e)}
          onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyUp && onKeyUp(e)}
          ref={ref}
          style={{
            whiteSpace: 'pre',
            ...style,
          }}
        />
      </>
    ) : (
      <textarea
        className={className}
        name={name}
        onBlur={e => onBlur(e)}
        onChange={e => handleChange(e.target.value)}
        onClick={e => e.stopPropagation()}
        onFocus={e => onFocus(e)}
        onKeyDown={e => onKeyDown(e)}
        onKeyUp={e => onKeyUp(e)}
        ref={ref}
        style={{
          ...style,
        }}
        value={currentValue}
      />
    );
}

export default AutosaveTextarea;
