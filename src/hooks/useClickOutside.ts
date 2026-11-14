import { useEffect, useRef, type RefObject } from 'react';

export function useClickOutside<T extends Node>(
  ref: RefObject<T | null>,
  onClickOutside: (event: Event) => void,
) {
  const onClickOutsideRef = useRef(onClickOutside);

  useEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const touch = { current: false };

    const handle = (event: Event) => {
      if (event.type === 'touchend') {
        touch.current = true;
      }
      if (event.type === 'click' && touch.current) {
        touch.current = false;
        return;
      }
      const el = ref.current;
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
  }, [ref]);
}

export default useClickOutside;
