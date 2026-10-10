import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useAutosave from '../../hooks/useAutosave';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './AutosaveTextField.css';

type AutosaveFieldElement = HTMLInputElement | HTMLTextAreaElement;

export interface AutosaveTextFieldProps {
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  delay?: number;
  multiline?: boolean;
  onBlur?: (event: React.FocusEvent<AutosaveFieldElement>) => void;
  onChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<AutosaveFieldElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<AutosaveFieldElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<AutosaveFieldElement>) => void;
  onSave?: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

const AutosaveTextField = ({
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
}: AutosaveTextFieldProps) => {
  const theme = useTheme();
  const [value, setValue] = useState(defaultValue);
  const fieldRef = useRef<AutosaveFieldElement>(null);
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
      'fikasio-autosave-text-field': true,
      'fikasio-theme-dark': theme === 'dark',
      'fikasio-theme-light': theme === 'light',
      ...convertClassNameToObj(className),
    }),
    onBlur: (event: React.FocusEvent<AutosaveFieldElement>) => {
      saveOnBlur();
      onBlur?.(event);
    },
    onChange: (event: React.ChangeEvent<AutosaveFieldElement>) => {
      handleChange(event.target.value);
    },
    onClick: (event: React.MouseEvent<AutosaveFieldElement>) => {
      if (event.shiftKey) {
        return;
      }
      event.stopPropagation();
    },
    onFocus: (event: React.FocusEvent<AutosaveFieldElement>) => {
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
};

export default AutosaveTextField;
