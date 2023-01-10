import styles from '../Grid.module.scss';

interface Props {
  xs?: number;
  sm: number;
  md: number;
  lg: number;
  xl?: number;
  className?: string;
}

export const GridColumn: React.FC<Props> = ({
  xs,
  sm,
  md,
  lg,
  xl,
  className,
  children,
}) => {
  return (
    <div
      className={[
        styles.column,
        xs && styles[`column__xs_${xs}`],
        styles[`column__sm_${sm}`],
        styles[`column__md_${md}`],
        styles[`column__lg_${lg}`],
        xl && styles[`column__xl_${xl}`],
        className
      ].join(' ')}>
      {children}
    </div>
  );
};

export default GridColumn;