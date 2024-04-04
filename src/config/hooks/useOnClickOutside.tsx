import { RefObject, useEffect } from 'react';

type EventListener = (event: MouseEvent | TouchEvent) => void;

const useOnClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: EventListener
) => {
  useEffect(() => {
    const listener: EventListener = (event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;