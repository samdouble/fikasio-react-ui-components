import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

type OverflowY = 'auto' | 'hidden';

type RowBounds = {
  maxRows?: number;
  minRows?: number;
};

type MeasuredHeight = {
  height: number;
  maxHeight?: number;
  minHeight?: number;
  overflowY: OverflowY;
};

const emptyStyle: CSSProperties = {};

function lineBoxHeight(computed: CSSStyleDeclaration): number {
  const lineHeight = Number.parseFloat(computed.lineHeight);
  if (Number.isFinite(lineHeight) && lineHeight > 0) {
    return lineHeight;
  }
  const fontSize = Number.parseFloat(computed.fontSize);
  if (Number.isFinite(fontSize) && fontSize > 0) {
    return fontSize * 1.2;
  }
  return 0;
}

function rowsToHeight(rows: number | undefined, line: number, chrome: number): number | undefined {
  if (rows == null || rows <= 0 || line <= 0) {
    return undefined;
  }
  return Math.ceil(chrome + (line * rows));
}

export function measureAutoHeight(field: HTMLElement, bounds: RowBounds = {}): MeasuredHeight {
  const computed = window.getComputedStyle(field);
  const border = (Number.parseFloat(computed.borderTopWidth) || 0)
    + (Number.parseFloat(computed.borderBottomWidth) || 0);
  const padding = (Number.parseFloat(computed.paddingTop) || 0)
    + (Number.parseFloat(computed.paddingBottom) || 0);
  const cssMaxHeight = Number.parseFloat(computed.maxHeight);
  const chrome = computed.boxSizing === 'border-box' ? padding + border : 0;
  const line = lineBoxHeight(computed);
  const previousHeight = field.style.height;
  const previousMaxHeight = field.style.maxHeight;
  const previousMinHeight = field.style.minHeight;
  const previousOverflow = field.style.overflowY;

  // Drop the current box so scrollHeight is the content, not the previous height.
  field.style.overflowY = 'hidden';
  field.style.maxHeight = 'none';
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
  field.style.maxHeight = previousMaxHeight;
  field.style.minHeight = previousMinHeight;
  field.style.overflowY = previousOverflow;

  const contentHeight = height;
  let minHeight = rowsToHeight(bounds.minRows, line, chrome);
  const maxHeight = rowsToHeight(bounds.maxRows, line, chrome);
  if (minHeight != null && maxHeight != null && minHeight > maxHeight) {
    minHeight = maxHeight;
  }
  if (minHeight != null) {
    height = Math.max(height, minHeight);
  }
  if (maxHeight != null) {
    height = Math.min(height, maxHeight);
  }

  const overflows = (Number.isFinite(cssMaxHeight) && contentHeight > cssMaxHeight)
    || (maxHeight != null && contentHeight > maxHeight);

  return {
    height,
    overflowY: overflows ? 'auto' : 'hidden',
    ...(maxHeight != null ? { maxHeight } : {}),
    ...(minHeight != null ? { minHeight } : {}),
  };
}

function sameBox(current: CSSProperties, next: CSSProperties) {
  return current.height === next.height
    && current.maxHeight === next.maxHeight
    && current.minHeight === next.minHeight
    && current.overflowY === next.overflowY;
}

export function useAutoResize<T extends HTMLElement>(
  enabled: boolean,
  value: string,
  minRows?: number,
  maxRows?: number,
) {
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [style, setStyle] = useState<CSSProperties>(emptyStyle);

  const sync = useCallback((field: T | null) => {
    if (!field || !enabled) {
      setStyle(current => (current === emptyStyle ? current : emptyStyle));
      return;
    }
    const next = measureAutoHeight(field, { maxRows, minRows });
    const nextStyle: CSSProperties = {
      height: next.height,
      overflowY: next.overflowY,
      ...(next.maxHeight != null ? { maxHeight: next.maxHeight } : {}),
      ...(next.minHeight != null ? { minHeight: next.minHeight } : {}),
    };
    field.style.height = `${next.height}px`;
    field.style.overflowY = next.overflowY;
    setStyle(current => (sameBox(current, nextStyle) ? current : nextStyle));
  }, [enabled, maxRows, minRows]);

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
