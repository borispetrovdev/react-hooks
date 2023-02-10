import { useCallback, useEffect } from 'react';

type KeyboardShortcutOptions = {
  predicate?: () => boolean;
  handler: () => void | Promise<void>;
  keys: {
    modifierKey?: ModifierKey;
    key: KeyboardEvent['key'];
  };
};

type ModifierKey = keyof Pick<KeyboardEvent, 'metaKey' | 'shiftKey' | 'ctrlKey'>;

const useKeyboardShortcut = ({ predicate, handler, keys: { modifierKey, key } }: KeyboardShortcutOptions) => {
  const handleShortcut = useCallback(
    (event: KeyboardEvent) => {
      if (predicate && !predicate()) return;
      if (modifierKey && !event[modifierKey]) return;
      if (event.key !== key) return;
      handler();
    },
    [handler, key, modifierKey, predicate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [handleShortcut]);
};

export default useKeyboardShortcut;
