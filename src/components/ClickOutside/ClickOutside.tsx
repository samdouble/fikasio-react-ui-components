import React, { useEffect, useRef } from 'react';

export interface ClickOutsideProps {
  children: React.ReactNode;
  onClickOutside: (event: Event) => void;
}

export function ClickOutside({
  children,
  onClickOutside,
}: ClickOutsideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onClickOutsideRef = useRef(onClickOutside);

  useEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    let isTouch = false;

    const handle = (event: Event) => {
      if (event.type === 'touchend') {
        isTouch = true;
      }
      if (event.type === 'click' && isTouch) {
        return;
      }
      const el = containerRef.current;
      if (el && !el.contains(event.target as Node)) {
        onClickOutsideRef.current(event);
      }
    };

    document.addEventListener('touchend', handle, true);
    document.addEventListener('click', handle, true);
    return () => {
      document.removeEventListener('touchend', handle, true);
      document.removeEventListener('click', handle, true);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}

export default ClickOutside;
