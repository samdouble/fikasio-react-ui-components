import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import ContentEditable, { ContentEditableEvent } from './ContentEditable';
import useAutosave from '../../hooks/useAutosave';
import { useAutoResize } from '../../hooks/useAutoResize';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import LinkifiedTextarea from '../LinkifiedTextarea/LinkifiedTextarea';
import './style.css';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'defaultValue' | 'onChange' | 'value'> {
  autoResize?: boolean;
  defaultValue?: string;
  linkify?: boolean;
  maxRows?: number;
  minRows?: number;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  useContentEditableDiv?: boolean;
  value?: string;
}

export const Textarea = React.forwardRef<HTMLElement, TextareaProps>(function Textarea({
  autoResize = false,
  className = '',
  maxRows,
  minRows,
  defaultValue = undefined,
  linkify = false,
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
  ...textareaProps
}, ref) {
  const isControlled = typeof value !== 'undefined';
  const hasDefaultValue = typeof defaultValue !== 'undefined';
  const [internalValue, setInternalValue] = useState<string>(
    hasDefaultValue ? defaultValue.toString() : '',
  );
  const currentValue = isControlled ? (value ?? '') : internalValue;

  const theme = useTheme();
  const shouldAutoResize = !linkify && (autoResize || minRows != null || maxRows != null);
  const { setRef: setAutoResizeRef, style: autoSizeStyle } = useAutoResize<HTMLElement>(
    shouldAutoResize,
    currentValue,
    minRows,
    maxRows,
  );
  const assignRef = useCallback((node: HTMLElement | null) => {
    setAutoResizeRef(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref, setAutoResizeRef]);
  const assignTextareaRef = useCallback((node: HTMLTextAreaElement | null) => {
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);
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

  if (linkify) {
    return (
      <LinkifiedTextarea
        {...textareaProps}
        autoResize={autoResize}
        className={className}
        maxRows={maxRows}
        minRows={minRows}
        name={name}
        onBlur={event => {
          saveOnBlur();
          onBlur(event);
        }}
        onChange={event => handleChange(event.target.value)}
        onFocus={event => {
          saveOnFocus();
          onFocus(event);
        }}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        plain
        ref={assignTextareaRef}
        style={style}
        value={currentValue}
      />
    );
  }

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
            'fikasio-autosize': shouldAutoResize,
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
            whiteSpace: shouldAutoResize ? 'pre-wrap' : 'pre',
            ...style,
            ...autoSizeStyle,
          }}
        />
      </>
    ) : (
      <textarea
        className={classNames({
          'fikasio-autosize': shouldAutoResize,
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
        rows={minRows ?? (shouldAutoResize ? 1 : undefined)}
        style={{
          ...style,
          ...autoSizeStyle,
        }}
        value={currentValue}
      />
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
