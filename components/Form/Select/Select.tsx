import { Label, Description } from 'components/Form';

import styles from './Select.module.scss';

interface Props {
  hideLabel?: boolean;
  required?: boolean;
  id: string;
  classes?: string;
  label?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  description?: string;
  options: Array<string>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<Props> = ({
  hideLabel,
  required,
  id,
  classes,
  label,
  name,
  value,
  disabled,
  description,
  options,
  onChange,
}) => {
  return (
    <div>
      {!hideLabel && (
        <Label
          htmlFor={id}
          text={label}
          required={required}
          disabled={disabled}
        />
      )}
      <select
        id={id}
        name={name || id}
        value={value}
        className={[styles.select, classes ? classes : ''].join(' ')}
        required={required}
        aria-required={required ? 'true' : 'false'}
        disabled={disabled}
        onChange={onChange}
      >
        {options?.map((option, index) => (
          <option key={`select-${index}`} value={option}>{option}</option>
        ))}
      </select>
      {description && <Description description={description} disabled={disabled} />}
    </div>
  );
};

export default Select;