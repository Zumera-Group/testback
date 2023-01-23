import styles from './FiveSteps.module.scss';
import { SectionHeading } from 'components/SectionHeading';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
export const Step: React.FC<any> = ({ step }) => {
  const { stepTitle, stepSubtitle, stepText } = step;
  const [animateOnce, setAnimateOnce] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !animateOnce) {
      setAnimateOnce(true);
    }
  }, [inView, animateOnce]);
  return (
    <div
      ref={ref}
      className={[styles.stepWrapper, inView ? styles.visible : ''].join(' ')}
    >
      <div className={styles.stepTile}>
        <SectionHeading
          title={stepTitle}
          description={stepText.description}
          headingType={'h4'}
        />
        <p>{stepSubtitle}</p>
      </div>
      <div className={styles.connector}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>
    </div>
  );
};
