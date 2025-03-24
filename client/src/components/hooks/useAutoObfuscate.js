import { useEffect, useRef } from 'react';
import { generateObfuscatedId } from '../../utils/obfuscateIDs';

export const useAutoObfuscate = (selector = '*') => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const targets = ref.current.querySelectorAll(selector);
      targets.forEach(el => {
        // Only add if it doesn't have an ID already
        if (!el.id) {
          el.id = generateObfuscatedId(el.tagName.toLowerCase());
        }
      });
    }
  }, [selector]);

  return ref;
};
