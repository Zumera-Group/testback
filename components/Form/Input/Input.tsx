import { Label, Description } from 'components/Form';

import styles from './Input.module.scss';

interface Props {
  hideLabel?: boolean;
  type:
    | 'text'
    | 'email'
    | 'url'
    | 'tel'
    | 'number'
    | 'password'
    | 'search'
    | '';
  required?: boolean;
  id: string;
  classes?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<Props> = ({
  hideLabel,
  type,
  required,
  id,
  classes,
  label,
  placeholder,
  value,
  name,
  disabled,
  description,
  onChange,
}) => {
  return (
    <div>
      {!hideLabel && (
        <Label
          htmlFor={id}
          text={label || placeholder}
          required={required}
          disabled={disabled}
        />
      )}
      <input
        type={type}
        id={id}
        name={name || id}
        className={[styles.input, classes ? classes : ''].join(' ')}
        required={required}
        aria-required={required ? 'true' : 'false'}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {description && (
        <Description description={description} disabled={disabled} />
      )}
    </div>
  );
};

export default Input;
