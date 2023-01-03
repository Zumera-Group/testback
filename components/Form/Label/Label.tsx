import styles from './Label.module.scss';

interface Props {
  htmlFor?: string;
  text?: string;
  required?: boolean;
  disabled?: boolean;
  classes?: string;
}

export const Label: React.FC<Props> = ({
  htmlFor,
  text,
  required,
  disabled,
  classes
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={[
        styles.label,
        disabled ? styles.label__disabled : '',
        classes ? classes : ''
      ].join(' ')}>
      {text}{required && (<>{' '}<span className={styles.requiredMark}>*</span></>)}
    </label>
  );
};

export default Label;