import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useAutosave from '../../hooks/useAutosave';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Input.css';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

export interface InputProps {
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  delay?: number;
  multiline?: boolean;
  onBlur?: (event: React.FocusEvent<InputElement>) => void;
  onChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<InputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<InputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<InputElement>) => void;
  onSave?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export function Input({
  autoFocus = false,
  className,
  defaultValue = '',
  delay = 1000,
  multiline = false,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  onKeyUp,
  onSave,
  placeholder,
  style,
}: InputProps) {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);
  const fieldRef = useRef<InputElement>(null);
  const {
    adoptValue,
    isFocusedRef,
    onBlur: saveOnBlur,
    onChange: saveOnChange,
    onFocus: saveOnFocus,
  } = useAutosave({
    delay,
    onSave,
    value,
  });

  useLayoutEffect(() => {
    if (!autoFocus) {
      return;
    }
    const field = fieldRef.current;
    if (!field) {
      return;
    }
    field.focus();
    field.setSelectionRange(0, 0);
  }, [autoFocus]);

  useEffect(() => {
    if (isFocusedRef.current) {
      return;
    }
    setValue(defaultValue);
    adoptValue(defaultValue);
  }, [adoptValue, defaultValue, isFocusedRef]);

  const handleChange = (nextValue: string) => {
    saveOnChange(nextValue);
    setValue(nextValue);
    onChange?.(nextValue);
  };

  const sharedProps = {
    className: classNames({
      'fikasio-input': true,
      'fikasio-theme-dark': theme === 'dark',
      'fikasio-theme-light': theme === 'light',
      ...convertClassNameToObj(className),
    }),
    onBlur: (event: React.FocusEvent<InputElement>) => {
      saveOnBlur();
      onBlur?.(event);
    },
    onChange: (event: React.ChangeEvent<InputElement>) => {
      handleChange(event.target.value);
    },
    onClick: (event: React.MouseEvent<InputElement>) => {
      if (event.shiftKey) {
        return;
      }
      event.stopPropagation();
    },
    onFocus: (event: React.FocusEvent<InputElement>) => {
      saveOnFocus();
      onFocus?.(event);
    },
    onKeyDown,
    onKeyUp,
    placeholder,
    style,
    value,
  };

  if (multiline) {
    return (
      <textarea
        {...sharedProps}
        ref={fieldRef as React.RefObject<HTMLTextAreaElement>}
        rows={1}
      />
    );
  }

  return (
    <input
      {...sharedProps}
      ref={fieldRef as React.RefObject<HTMLInputElement>}
      type="text"
    />
  );
}

export default Input;
