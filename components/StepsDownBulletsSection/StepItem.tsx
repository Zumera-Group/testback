import { H } from 'components/Typography/H';
import { P } from 'components/Typography/P';
import styles from './StepsDownBulletsSection.module.scss';
import { Icon } from 'components/Icon';
import Link from 'next/link';

interface IProps {
  step: any;
  index: number;
}
export const StepItem: React.FC<IProps> = ({ step, index }) => {
  return (
    <div className={styles.stepItem}>
      <H variant={'h2'} className={styles.stepIndex}>
        {index}
      </H>
      <div className={styles.stepItemContent}>
        <H variant={'h4'} color={'inherit'} className={styles.stepName}>
          {step.title}
        </H>
        {step?.bullets ? (
          <ul className={styles.stepsList}>
            {step?.bullets.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        ) : null}
        {/*<P fontSize={'1rem'} color={'inherit'}>*/}
        {/*  {step.shortDescription}*/}
        {/*</P>*/}
      </div>
    </div>
  );
};
