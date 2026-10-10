import React, { useState } from 'react';
import classNames from 'classnames';
import ContentEditable, { ContentEditableEvent } from './ContentEditable';
import useAutosave from '../../hooks/useAutosave';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './style.css';

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
  ref?: React.Ref<unknown>,
  style?: React.CSSProperties;
  useContentEditableDiv?: boolean;
  value?: string;
}

export function AutosaveTextarea({
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
  const currentValue = isControlled ? (value ?? '') : internalValue;

  const theme = useTheme();
  const {
    onBlur: saveOnBlur,
    onChange: saveOnChange,
    onFocus: saveOnFocus,
  } = useAutosave({
    commitExternalValue: isControlled,
    onSave,
    value: currentValue,
  });

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    saveOnBlur();
    onBlur(event as React.FocusEvent<HTMLTextAreaElement>);
  };

  const handleChange = (newValue: string) => {
    saveOnChange(newValue);
    onChange(newValue);
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    saveOnFocus();
    onFocus(event as React.FocusEvent<HTMLTextAreaElement>);
  };

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
          onBlur={handleBlur}
          onChange={(e: ContentEditableEvent) => handleChange(e.target.value)}
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          onFocus={handleFocus}
          onKeyDown={e => onKeyDown?.(e as React.KeyboardEvent<HTMLTextAreaElement>)}
          onKeyUp={e => onKeyUp?.(e as React.KeyboardEvent<HTMLTextAreaElement>)}
          ref={ref as React.Ref<HTMLElement>}
          style={{
            whiteSpace: 'pre',
            ...style,
          }}
        />
      </>
    ) : (
      <textarea
        className={classNames({
          'fikasio-textarea': true,
          'fikasio-theme-dark': theme === 'dark',
          'fikasio-theme-light': theme === 'light',
          ...convertClassNameToObj(className),
        })}
        name={name}
        onBlur={handleBlur}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
        onClick={(e: React.MouseEvent<HTMLTextAreaElement>) => e.stopPropagation()}
        onFocus={handleFocus}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyDown && onKeyDown(e)}
        onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onKeyUp && onKeyUp(e)}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        style={{
          ...style,
        }}
        value={currentValue}
      />
    );
}

export default AutosaveTextarea;
