import React from 'react';

export const useHover = (): [
  React.MutableRefObject<HTMLDivElement>,
  boolean,
] => {
  const [value, setValue] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseOver);
      node.addEventListener('mouseleave', handleMouseOut);

      return () => {
        node.removeEventListener('mouseenter', handleMouseOver);
        node.removeEventListener('mouseleave', handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, value];
};
