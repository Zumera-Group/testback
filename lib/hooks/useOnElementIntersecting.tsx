import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useOnElementIntersecting = (options: {
  threshold: number;
  rootMargin?: string;
}): [MutableRefObject<any>, boolean] => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onAppear = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      return;
    } else {
      setIsVisible(entry.isIntersecting);
      observer.unobserve(entry.target);
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    const observer = new IntersectionObserver(onAppear, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
