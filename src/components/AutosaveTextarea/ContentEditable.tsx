import * as React from 'react';
import { useRef, useEffect, useCallback } from 'react';
import deepEqual from 'fast-deep-equal';

function replaceCaret(el: HTMLElement) {
  const target = document.createTextNode('');
  el.appendChild(target);
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection();
    if (sel !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}

export interface Props {
  html: string,
  disabled?: boolean,
  tagName?: string,
  className?: string,
  children?: React.ReactNode,
  placeholder?: string,
  ref?: React.Ref<HTMLElement>,
  style?: React.CSSProperties,
  innerRef?: React.RefObject<HTMLElement> | ((current: HTMLElement | null) => void),
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLElement>) => void,
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void,
  onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void,
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void,
  onChange?: (event: ContentEditableEvent) => void,
}

function ContentEditableComponent(props: Props) {
  const {
    tagName,
    html,
    innerRef,
    disabled,
    onBlur,
    onKeyUp,
    onKeyDown,
    onChange,
    children,
    ...restProps
  } = props;

  const lastHtmlRef = useRef<string>(html);
  const elRef = useRef<HTMLElement | null>(null);
  const fallbackRef = useRef<HTMLElement | null>(null);

  const getEl = useCallback(() => {
    if (innerRef && typeof innerRef !== 'function' && 'current' in innerRef) {
      return (innerRef as React.RefObject<HTMLElement>).current;
    }
    return elRef.current || fallbackRef.current;
  }, [innerRef]);

  const emitChange = useCallback((originalEvt: React.SyntheticEvent<unknown>) => {
    const el = getEl();
    if (!el) return;

    const currentHtml = el.innerHTML;
    if (onChange && currentHtml !== lastHtmlRef.current) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: currentHtml,
        },
      });
      onChange(evt);
    }
    lastHtmlRef.current = html;
  }, [onChange, getEl]);

  const handleRef = useCallback((current: HTMLElement | null) => {
    if (typeof innerRef === 'function') {
      innerRef(current);
      elRef.current = current;
    } else if (innerRef) {
      // innerRef is a RefObject, React will handle it automatically
      // We just need to track it in elRef for getEl()
      elRef.current = current;
    } else {
      fallbackRef.current = current;
      elRef.current = current;
    }
  }, [innerRef]);

  useEffect(() => {
    const el = getEl();
    if (!el) return;

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (html !== el.innerHTML) {
      el.innerHTML = html;
    }
    lastHtmlRef.current = html;
    replaceCaret(el);
  }, [html, getEl]);

  const refToUse = typeof innerRef === 'function'
    ? handleRef
    : innerRef || fallbackRef;

  return React.createElement(
    tagName || 'div',
    {
      ...restProps,
      ref: refToUse,
      onInput: emitChange,
      onBlur: onBlur || emitChange,
      onKeyUp: onKeyUp || emitChange,
      onKeyDown: onKeyDown || emitChange,
      contentEditable: !disabled,
      dangerouslySetInnerHTML: { __html: html },
    },
    children,
  );
}

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return (
    prevProps.html === nextProps.html &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.tagName === nextProps.tagName &&
    prevProps.className === nextProps.className &&
    prevProps.innerRef === nextProps.innerRef &&
    prevProps.placeholder === nextProps.placeholder &&
    deepEqual(prevProps.style, nextProps.style)
  );
};

const ContentEditable = React.memo(ContentEditableComponent, areEqual);

export default ContentEditable;

export type ContentEditableEvent = React.SyntheticEvent<unknown, Event> & { target: { value: string } };
