import { useEffect, useRef } from 'react';

function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const timeoutId = setTimeout(() => {
      callbackRef.current();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);
}

export default useTimeout;

