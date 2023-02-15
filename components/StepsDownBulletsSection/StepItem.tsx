import styles from './StepsDownBulletsSection.module.scss';

interface IProps {
  step: any;
  index: number;
}
export const StepItem: React.FC<IProps> = ({ step, index }) => {
  return (
    <div className={styles.stepItem}>
      <h2 className={styles.stepIndex}>{index}</h2>
      <div className={styles.stepItemContent}>
        <h4 className={styles.stepName}>{step.title}</h4>
        {step?.bullets ? (
          <ul className={styles.stepsList}>
            {step?.bullets.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
