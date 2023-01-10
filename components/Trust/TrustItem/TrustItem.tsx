import { useRef, useEffect, useState } from 'react';

import { animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import styles from './TrustItem.module.scss';

export const TrustItem = ({ title, extractNumberFromString, subtitle, index }) => {

  const numberToAnimateRef = useRef(null);
  const { ref, inView } = useInView();
  const [animateOnce, setAnimateOnce] = useState(false);

  const numberInTitle = extractNumberFromString(title)[0].toString();
  const titleSplit = [];
  if (numberInTitle) {
    const startPositionOfNumber = title.indexOf(numberInTitle);
    const endPositionOfNumber = startPositionOfNumber + numberInTitle.length;

    if (startPositionOfNumber > 0) {
      titleSplit.push(title.slice(0, startPositionOfNumber))
    };
    titleSplit.push(parseInt(title.slice(startPositionOfNumber, endPositionOfNumber))); // Or parseInt(numberInTitle);
    if (endPositionOfNumber < title.length) { 
      titleSplit.push(title.slice(endPositionOfNumber, title.length));
    }
  }

  const countAnimation = () => {
    let element = numberToAnimateRef?.current;
    const startNumber = 0;
    const endNumber = parseInt(element.textContent);
    element.textContent = startNumber;
    const animateNumberCount = animate(startNumber, endNumber, {
      duration: 2,
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      }
    });
  }

  useEffect(() => {
    if (!numberToAnimateRef) return;
    if (inView && !animateOnce) {
      countAnimation();
      setAnimateOnce(true);
    }
  }, [inView, animateOnce]);

  return (
    <div ref={ref} className={styles.trustItem}>
      {title && (
        titleSplit.length > 0 ? (
          <h3 className={styles.title}>
            {titleSplit.map((item, itemIndex) => {
              const numberToAnimate = typeof item === 'number';
              const numberProps = numberToAnimate ? { ref: numberToAnimateRef } : {};
              return (
                <span
                  key={`trustTitle-${index}-${itemIndex}`}
                  {...numberProps}>
                  {item}
                </span>
              )
            })}
          </h3>
        ) : <h3 className={styles.title}>{title}</h3>
      )}
      {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
    </div>
  );
};

export default TrustItem;