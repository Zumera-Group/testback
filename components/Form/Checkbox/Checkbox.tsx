import styles from './Checkbox.module.scss';

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

export const Checkbox: React.FC<Props> = ({
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
    <div className={[
      styles.checkboxWrapper,
      disabled ? styles.checkboxWrapper__disabled : '',
      classes ? classes : ''
    ].join(' ')}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={id}
        name={name || id}
        required={required}
        aria-required={required ? 'true' : 'false'}
        disabled={disabled}
        onChange={onChange}
        checked={isChecked}
      />
      <label
        htmlFor={id}
        className={styles.checkboxLabel}
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;