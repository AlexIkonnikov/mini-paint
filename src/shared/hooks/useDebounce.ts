import { useEffect, useMemo, useRef } from 'react';

const useDebounce = <T extends (...arg: never[]) => void>(
  callback: T,
  delay = 1000,
) => {
  let timeout = useRef<ReturnType<typeof setTimeout>>(null).current;

  const debouncedFn = useMemo(() => {
    return (...args: Parameters<T>) => {
      timeout && clearTimeout(timeout);

      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, [callback]);

  useEffect(
    () => () => {
      timeout && clearTimeout(timeout);
    },
    [debouncedFn, timeout],
  );

  return debouncedFn;
};

export default useDebounce;
