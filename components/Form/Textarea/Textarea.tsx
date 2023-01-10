import { Label, Description } from 'components/Form';

import styles from './Textarea.module.scss';

interface Props {
  hideLabel?: boolean;
  required?: boolean;
  id: string;
  classes?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  rows?: number;
  disabled?: boolean;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<Props> = ({
  hideLabel,
  required,
  id,
  classes,
  label,
  placeholder,
  value,
  name,
  rows,
  disabled,
  description,
  onChange,
}) => {
  return (
    <div>
      {!hideLabel && (
        <Label
          htmlFor={id} text={label || placeholder}
          required={required}
          disabled={disabled}
        />
      )}
      <textarea
        rows={rows || 6}
        id={id}
        name={name || id}
        className={[styles.textarea, classes ? classes : ''].join(' ')}
        required={required}
        aria-required={required ? 'true' : 'false'}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      ></textarea>
      {description && <Description description={description} disabled={disabled} />}
    </div>
  );
};

export default Textarea;