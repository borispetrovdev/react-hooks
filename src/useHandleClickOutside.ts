import { useCallback, useEffect } from 'react';

type DocumentClickEventListenerCallback = Parameters<typeof document.addEventListener<'click'>>[1];

export function useHandleClickOutside<T extends Node>(targetElRef: React.RefObject<T>, handler: () => void) {
  const handleClickOutside = useCallback<DocumentClickEventListenerCallback>(
    (event) => {
      if (!targetElRef.current) {
        console.error('Missing targetElRef.current in useHandleClickOutside');
        return;
      }

      const targetEl = targetElRef.current;
      const clickedEl = event?.target as Node;
      if (!targetEl.contains(clickedEl)) {
        handler();
      }
    },
    [handler, targetElRef]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [handleClickOutside]);
}
