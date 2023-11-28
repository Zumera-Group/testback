import styles from './Section.module.scss';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';

interface Props {
  as?: '' | 'section' | 'article' | 'div' | 'header' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bg?: 'gradient' | 'primary' | 'secondary' | 'tertiary' | 'light' | 'white';
  color?: 'primary' | 'secondary' | 'white';
  divider?: boolean;
  classes?: string;
  id?: string;
  children: any;
  ref?: any;
}

export const Section: React.FC<Props> = ({
  as,
  size,
  bg,
  color,
  divider,
  classes,
  id,
  children,
  ref,
  ...rest
}) => {
  const Component = as || 'section';
  const { whiteBg } = useSharedContentContext();
  const sectionBG = () => {
    if (whiteBg && bg === 'light') {
      return styles['bg-white'] || styles['bg-light'];
    } else {
      return styles[`bg-${bg}`] || styles['bg-light'];
    }
  };

  const sectionStyles = [
    styles.section,
    styles[`size-${size}`] || styles['size-md'],
    sectionBG(),
    styles[`color-${color}` || styles['color-primary']],
    divider && styles[`divider`],
    classes ?? '',
  ];

  return (
    <Component className={sectionStyles.join(' ')} id={id} {...rest} ref={ref}>
      {children}
    </Component>
  );
};

export default Section;
