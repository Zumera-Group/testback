import { useRef, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import styles from './Marquee.module.scss';

export const Marquee = ({ items }) => {
  const scrollerRef = useRef(null);
  const [scrollerWidth, setScrollerWidth] = useState(0);

  useEffect(() => {
    if (!scrollerRef) return;
    const setWidth = () => {
      const width = scrollerRef?.current?.offsetWidth
      setScrollerWidth(width);
    }
    setWidth();
    window.addEventListener('resize', setWidth, true)
    return () => window.removeEventListener('resize', setWidth);
  }, [scrollerRef]);

  if (!items.length) return null;

  const variants = {
    animate: {
      x: [0, -scrollerWidth / 2],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: Math.round(items.length / 1.5),
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={styles.marquee}>
      <motion.ul
        ref={scrollerRef}
        key={scrollerWidth}
        className={styles.scroller}
        variants={variants}
        animate="animate"
      >
        {items.concat(items).map((item, i) => (
          <li key={`marqueeItem-${i}`} className={styles.item}>
            {item}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Marquee;