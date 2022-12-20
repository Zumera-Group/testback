import styles from './Button.module.scss';

export const generateButtonVariant  = ({ type, onDark }) => {
  const classes: string[] = [];

  if (type === 'primary' && !onDark) classes.push(styles.button__primary);
  if (type === 'primary' && onDark) classes.push(styles.button__primaryOnDark);

  if (type === 'secondary' && !onDark) classes.push(styles.button__secondary);
  if (type === 'secondary' && onDark) classes.push(styles.button__secondaryOnDark);

  if (type === 'tertiary' && !onDark) classes.push(styles.button__tertiary);
  if (type === 'tertiary' && onDark) classes.push(styles.button__tertiaryOnDark);

  if (type === 'link' && !onDark) classes.push(styles.button__link);
  if (type === 'link' && onDark) classes.push(styles.button__linkOnDark);

  return classes.join(' ');
}

export default generateButtonVariant;