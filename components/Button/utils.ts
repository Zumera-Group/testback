import styles from './Button.module.scss';

export const generateButtonVariant = ({ variant, onDark }) => {
  const classes: string[] = [];

  if (variant === 'primary' && !onDark) classes.push(styles.button__primary);
  if (variant === 'primary' && onDark)
    classes.push(styles.button__primaryOnDark);

  if (variant === 'secondary' && !onDark)
    classes.push(styles.button__secondary);
  if (variant === 'secondary' && onDark)
    classes.push(styles.button__secondaryOnDark);

  if (variant === 'tertiary' && !onDark) classes.push(styles.button__tertiary);
  if (variant === 'tertiary' && onDark)
    classes.push(styles.button__tertiaryOnDark);

  if (variant === 'link' && !onDark) classes.push(styles.button__link);
  if (variant === 'link' && onDark) classes.push(styles.button__linkOnDark);

  if (variant === 'download' && !onDark) classes.push(styles.button__download);
  if (variant === 'download' && onDark)
    classes.push(styles.button__downloadOnDark);

  return classes.join(' ');
};

export default generateButtonVariant;
