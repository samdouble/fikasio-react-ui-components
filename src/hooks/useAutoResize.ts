import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

type OverflowY = 'auto' | 'hidden';

const emptyStyle: CSSProperties = {};

export function measureAutoHeight(field: HTMLElement): { height: number; overflowY: OverflowY } {
  const computed = window.getComputedStyle(field);
  const border = (Number.parseFloat(computed.borderTopWidth) || 0)
    + (Number.parseFloat(computed.borderBottomWidth) || 0);
  const padding = (Number.parseFloat(computed.paddingTop) || 0)
    + (Number.parseFloat(computed.paddingBottom) || 0);
  const maxHeight = Number.parseFloat(computed.maxHeight);
  const previousHeight = field.style.height;
  const previousMinHeight = field.style.minHeight;
  const previousOverflow = field.style.overflowY;

  // Drop the current box so scrollHeight is the content, not the previous height.
  field.style.overflowY = 'hidden';
  field.style.minHeight = '0px';
  field.style.height = '0px';

  let height = field.scrollHeight;
  if (computed.boxSizing === 'border-box') {
    height += border;
  } else {
    height -= padding;
  }
  if (!Number.isFinite(height) || height < 0) {
    height = 0;
  }
  height = Math.ceil(height);

  field.style.height = previousHeight;
  field.style.minHeight = previousMinHeight;
  field.style.overflowY = previousOverflow;

  return {
    height,
    overflowY: Number.isFinite(maxHeight) && height > maxHeight ? 'auto' : 'hidden',
  };
}

export function useAutoResize<T extends HTMLElement>(enabled: boolean, value: string) {
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [style, setStyle] = useState<CSSProperties>(emptyStyle);

  const sync = useCallback((field: T | null) => {
    if (!field || !enabled) {
      setStyle(current => (current === emptyStyle ? current : emptyStyle));
      return;
    }
    const next = measureAutoHeight(field);
    const nextStyle: CSSProperties = {
      height: next.height,
      overflowY: next.overflowY,
    };
    field.style.height = `${next.height}px`;
    field.style.overflowY = next.overflowY;
    setStyle(current => (
      current.height === nextStyle.height && current.overflowY === nextStyle.overflowY
        ? current
        : nextStyle
    ));
  }, [enabled]);

  const setRef = useCallback((node: T | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    elementRef.current = node;
    if (node && enabled && typeof ResizeObserver !== 'undefined') {
      let width = node.clientWidth;
      const observer = new ResizeObserver(() => {
        if (node.clientWidth === width) {
          return;
        }
        width = node.clientWidth;
        sync(node);
      });
      observer.observe(node);
      observerRef.current = observer;
    }
    sync(node);
  }, [enabled, sync]);

  useLayoutEffect(() => {
    sync(elementRef.current);
  }, [sync, value]);

  useEffect(() => () => {
    observerRef.current?.disconnect();
  }, []);

  return {
    setRef,
    style: enabled ? style : emptyStyle,
  };
}
