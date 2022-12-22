import { useEffect, useCallback, useState } from 'react';

export const useMediaQuery = (media: string): boolean => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const matchMedia = window.matchMedia(media);

    if (matchMedia?.addEventListener) {
      matchMedia.addEventListener('change', (e) => updateTarget(e));
    } else {
      matchMedia.addListener(updateTarget);
    }

    // Check on mount (callback is not called until a change occurs)
    if (matchMedia && matchMedia.matches) {
      setTargetReached(true);
    }

    return () => {
      if (matchMedia && 'addEventListener' in matchMedia) {
        return matchMedia.removeEventListener('change', (e) => updateTarget(e));
      } else {
        // Fallback to keep compatibility with older browsers
        return matchMedia.removeListener(updateTarget);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetReached;
};