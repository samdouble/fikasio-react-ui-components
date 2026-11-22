import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import useTheme from '../../hooks/useTheme';
import convertClassNameToObj from '../../utils/convertClassNameToObj';
import './Modal.css';

export type ModalSize = 'sm' | 'lg' | 'xl';

export interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  closeLabel?: string;
  dismissible?: boolean;
  footer?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  size?: ModalSize;
  staticBackdrop?: boolean;
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function Modal({
  children,
  className = '',
  closeLabel = 'Close',
  dismissible = true,
  footer,
  isOpen = false,
  onClose = () => undefined,
  size,
  staticBackdrop = false,
  style = {},
  title,
}: ModalProps) {
  const theme = useTheme();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const dismissibleRef = useRef(dismissible);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    dismissibleRef.current = dismissible;
  }, [dismissible]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previouslyFocused.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      if (event.key === 'Escape') {
        if (dismissibleRef.current) {
          event.preventDefault();
          onCloseRef.current();
        }
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && dialog.contains(active);

      if (event.shiftKey && (active === first || active === dialog || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || active === dialog || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  const backdropCloses = dismissible && !staticBackdrop;

  return createPortal(
    <div className="fikasio-modal">
      <button
        aria-hidden="true"
        className={classNames({
          'fikasio-modal-backdrop': true,
          'fikasio-modal-backdrop-static': !backdropCloses,
        })}
        onClick={() => {
          if (backdropCloses) {
            onClose();
          }
        }}
        tabIndex={-1}
        type="button"
      />
      <div
        className={classNames({
          'fikasio-modal-dialog': true,
          'fikasio-modal-sm': size === 'sm',
          'fikasio-modal-lg': size === 'lg',
          'fikasio-modal-xl': size === 'xl',
        })}
      >
        <div
          aria-labelledby={title ? titleId : undefined}
          aria-modal="true"
          className={classNames({
            'fikasio-modal-content': true,
            'fikasio-theme-dark': theme === 'dark',
            'fikasio-theme-light': theme === 'light',
            ...convertClassNameToObj(className),
          })}
          ref={dialogRef}
          role="dialog"
          style={style}
          tabIndex={-1}
        >
          {(title || dismissible) && (
            <div className="fikasio-modal-header">
              {title && (
                <h2
                  className="fikasio-modal-title"
                  id={titleId}
                >
                  {title}
                </h2>
              )}
              {dismissible && (
                <Button.Action
                  ariaLabel={closeLabel}
                  className="fikasio-modal-close"
                  onClick={onClose}
                  type="button"
                >
                  <Icon name="times" />
                </Button.Action>
              )}
            </div>
          )}
          <div className="fikasio-modal-body">
            {children}
          </div>
          {footer != null && (
            <div className="fikasio-modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
