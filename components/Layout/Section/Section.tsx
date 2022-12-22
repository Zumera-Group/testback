import styles from './Section.module.scss';

interface Props {
  as?: '' | 'section' | 'article' | 'div' | 'header' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bg?: 'gradient' | 'primary' | 'secondary' | 'tertiary' | 'light',
  color?: 'primary' | 'secondary' | 'white';
  divider?: boolean,
  classes?: string;
  id?: string;
  children: any;
};

export const Section: React.FC<Props> = ({
  as,
  size,
  bg,
  color,
  divider,
  classes,
  id,
  children,
  ...rest
}) => {
  const Component = as || 'section';

  const sectionStyles = [
    styles.section,
    styles[`size-${size}`] || styles['size-md'],
    styles[`bg-${bg}`] || styles['bg-light'],
    styles[`color-${color}` || styles['color-primary']],
    divider && styles[`divider`],
    classes ?? '',
  ];

  return (
    <Component className={sectionStyles.join(' ')} id={id} {...rest}>
      {children}
    </Component>
  )
};

export default Section;