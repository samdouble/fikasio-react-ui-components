import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAutoResize } from '../../hooks/useAutoResize';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import { linkify } from '../../utils/linkify';
import LinkifiedText from '../LinkifiedText/LinkifiedText';
import './LinkifiedTextarea.css';

export type LinkifiedTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  autoResize?: boolean;
  maxRows?: number;
  minRows?: number;
  plain?: boolean;
};

const LinkifiedTextarea = React.forwardRef<HTMLTextAreaElement, LinkifiedTextareaProps>(({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  autoResize = false,
  className = '',
  id,
  maxRows,
  minRows,
  onBlur,
  plain = false,
  rows,
  style,
  value,
  ...rest
}, ref) => {
  const text = value == null ? '' : String(value);
  const hasLink = linkify(text).some(segment => segment.type === 'link');
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const shouldFocusRef = useRef(false);
  const theme = useTheme();
  const shouldAutoResize = autoResize || minRows != null || maxRows != null;
  const { setRef: setAutoResizeRef, style: autoSizeStyle } = useAutoResize<HTMLElement>(
    shouldAutoResize,
    text,
    minRows,
    maxRows,
  );

  const setTextareaRef = useCallback((node: HTMLTextAreaElement | null) => {
    textareaRef.current = node;
    setAutoResizeRef(node);
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref, setAutoResizeRef]);

  useEffect(() => {
    if (!isEditing || !shouldFocusRef.current) {
      return;
    }
    shouldFocusRef.current = false;
    const field = textareaRef.current;
    if (!field) {
      return;
    }
    field.focus();
    const end = field.value.length;
    field.setSelectionRange(end, end);
  }, [isEditing]);

  const startEditing = () => {
    shouldFocusRef.current = true;
    setIsEditing(true);
  };

  const fieldClassName = classNames({
    'fikasio-linkified-textarea': true,
    'fikasio-linkified-textarea-plain': plain,
    'fikasio-theme-dark': theme === 'dark',
    'fikasio-theme-light': theme === 'light',
    'form-control': !plain,
    ...convertClassNameToObj(className),
  });

  if (!isEditing && hasLink) {
    return (
      <div
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={classNames(fieldClassName, 'fikasio-linkified-textarea-preview', {
          'fikasio-autosize': shouldAutoResize,
        })}
        id={id}
        onClick={event => {
          if ((event.target as HTMLElement).closest('a')) {
            return;
          }
          startEditing();
        }}
        onKeyDown={event => {
          if (event.target !== event.currentTarget) {
            return;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            startEditing();
          }
        }}
        role="textbox"
        ref={setAutoResizeRef}
        style={shouldAutoResize ? autoSizeStyle : undefined}
        tabIndex={0}
      >
        <LinkifiedText text={text} />
      </div>
    );
  }

  return (
    <textarea
      {...rest}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classNames(fieldClassName, {
        'fikasio-autosize': shouldAutoResize,
      })}
      id={id}
      onBlur={event => {
        onBlur?.(event);
        setIsEditing(false);
      }}
      ref={setTextareaRef}
      rows={minRows ?? rows ?? (shouldAutoResize ? 1 : undefined)}
      style={{
        ...style,
        ...autoSizeStyle,
      }}
      value={value}
    />
  );
});

LinkifiedTextarea.displayName = 'LinkifiedTextarea';

export default LinkifiedTextarea;
