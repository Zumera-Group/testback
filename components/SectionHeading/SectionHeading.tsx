import { SanityBlockContent } from 'components/SanityBlockContent';

import styles from './SectionHeading.module.scss';

interface Props {
  title?: string;
  subtitle?: string;
  description?: any[] | string;
  headingType?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'right' | 'center';
  classes?: string;
}

export const SectionHeading: React.FC<Props> = ({
  title,
  subtitle,
  description,
  headingType,
  align,
  classes,
}) => {
  const Heading = headingType || 'h2';

  return (
    <div
      className={[
        styles.sectionHeading,
        align && styles[`align-${align}`],
        classes ?? '',
      ].join(' ')}
    >
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {title && <Heading className={styles.title}>{title}</Heading>}
      {Array.isArray(description) ? (
        <SanityBlockContent text={description} />
      ) : null}
      {typeof description === 'string' || description instanceof String ? (
        <p className={styles.textDescription}>{description}</p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
