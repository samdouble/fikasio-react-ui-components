import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import ContentEditable, { ContentEditableEvent } from './ContentEditable';
import useAutosave from '../../hooks/useAutosave';
import { useAutoResize } from '../../hooks/useAutoResize';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './style.css';

export interface AutosaveTextareaProps {
  autoResize?: boolean;
  className?: string;
  defaultValue?: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSave?: (value: string) => void;
  style?: React.CSSProperties;
  useContentEditableDiv?: boolean;
  value?: string;
}

export const AutosaveTextarea = React.forwardRef<HTMLElement, AutosaveTextareaProps>(function AutosaveTextarea({
  autoResize = false,
  className = '',
  defaultValue = undefined,
  name = undefined,
  onBlur = () => undefined,
  onChange = () => undefined,
  onFocus = () => undefined,
  onKeyDown = () => undefined,
  onKeyUp = () => undefined,
  onSave = () => undefined,
  style = {},
  useContentEditableDiv = true,
  value = undefined,
}, ref) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string>(
    hasDefaultValue ? defaultValue.toString() : '',
  );
  const currentValue = isControlled ? (value ?? '') : internalValue;

  const theme = useTheme();
  const { setRef: setAutoResizeRef, style: autoSizeStyle } = useAutoResize<HTMLElement>(
    autoResize,
    currentValue,
  );
  const assignRef = useCallback((node: HTMLElement | null) => {
    setAutoResizeRef(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref, setAutoResizeRef]);
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
            'fikasio-autosize': autoResize,
            'fikasio-textarea': true,
            'fikasio-theme-dark': theme === 'dark',
            'fikasio-theme-light': theme === 'light',
            ...convertClassNameToObj(className),
          })}
          html={currentValue}
          innerRef={assignRef}
          onBlur={handleBlur}
          onChange={(e: ContentEditableEvent) => handleChange(e.target.value)}
          onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
          onFocus={handleFocus}
          onKeyDown={e => onKeyDown?.(e as React.KeyboardEvent<HTMLTextAreaElement>)}
          onKeyUp={e => onKeyUp?.(e as React.KeyboardEvent<HTMLTextAreaElement>)}
          style={{
            whiteSpace: autoResize ? 'pre-wrap' : 'pre',
            ...style,
            ...autoSizeStyle,
          }}
        />
      </>
    ) : (
      <textarea
        className={classNames({
          'fikasio-autosize': autoResize,
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
        ref={assignRef}
        rows={autoResize ? 1 : undefined}
        style={{
          ...style,
          ...autoSizeStyle,
        }}
        value={currentValue}
      />
    );
});

AutosaveTextarea.displayName = 'AutosaveTextarea';

export default AutosaveTextarea;
