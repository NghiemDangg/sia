import type { EffectCallback } from 'react';

import { useEffect, useState, useRef } from 'react';

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  const timerId = useRef<NodeJS.Timeout>();

  useEffect((): ReturnType<EffectCallback> => {
    timerId.current = setTimeout((): void => {
      setDebounceValue(value);
    }, delay || 600);

    return (): void => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [delay, value]);

  return debounceValue;
};
