import styles from './FormGroup.module.scss';

interface Props {
  classes?: string;
  children: any;
}

export const FormGroup: React.FC<Props> = ({ classes, children }) => {
  return (
    <div className={[
      styles.formGroup,
      classes ? classes : ''
      ].join(' ')}
    >
      {children}
    </div>
  )
}