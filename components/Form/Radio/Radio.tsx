import styles from './Radio.module.scss';

interface Props {
  disabled?: boolean;
  required?: boolean;
  children: any;
  id: string;
  classes?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked?: boolean;
}

export const Radio: React.FC<Props> = ({
  disabled,
  required,
  children,
  id,
  classes,
  name,
  onChange,
  isChecked,
}) => {
  return (
    <div
      className={[
        styles.radioWrapper,
        disabled ? styles.radioWrapper__disabled : '',
        classes ? classes : '',
      ].join(' ')}
    >
      <input
        type="radio"
        className={styles.radio}
        id={id}
        name={name || id}
        disabled={disabled}
        required={required}
        onChange={onChange}
        checked={isChecked}
      />
      <label htmlFor={id} className={styles.radioLabel}>
        {children}
      </label>
    </div>
  );
};

export default Radio;
