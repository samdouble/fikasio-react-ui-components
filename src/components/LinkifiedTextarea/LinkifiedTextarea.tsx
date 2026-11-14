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
  plain?: boolean;
};

const LinkifiedTextarea = React.forwardRef<HTMLTextAreaElement, LinkifiedTextareaProps>(({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  autoResize = false,
  className = '',
  id,
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
  const showField = isEditing || !hasLink;
  const { setRef: setAutoResizeRef, style: autoSizeStyle } = useAutoResize<HTMLTextAreaElement>(
    autoResize && showField,
    text,
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
        className={classNames(fieldClassName, 'fikasio-linkified-textarea-preview')}
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
        'fikasio-autosize': autoResize,
      })}
      id={id}
      onBlur={event => {
        onBlur?.(event);
        setIsEditing(false);
      }}
      ref={setTextareaRef}
      rows={autoResize && rows == null ? 1 : rows}
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
