import styles from './ProgressBarLine.module.scss';

export const ProgressBarLine = ({
  indicator,
  currentCategory,
  categoryIndex,
  progress,
}) => {
  console.log(progress);
  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.progressLabels}>
        <span className={styles.category}>
          {categoryIndex}. {currentCategory}
        </span>
        <span className={styles.indicator}>
          Question{' '}
          {indicator?.current > indicator?.total
            ? indicator?.current - 1
            : indicator?.current}{' '}
          / {indicator?.total}
        </span>
      </div>
      <div className={styles.outerBar}>
        <div
          className={styles.innerBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarLine;
