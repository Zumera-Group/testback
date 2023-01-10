import { SanityBlockContent } from 'components/SanityBlockContent';

import styles from './Fact.module.scss';

export const Fact = ({ fact }) => {
  const { factTitle, factSubtitle, factDescription } = fact;

  return (
    <div className={styles.fact}>
      {factTitle && <h4 className={styles.title}>{factTitle}</h4>}
      {factSubtitle && <h5 className={styles.subtitle}>{factSubtitle}</h5>}
      {Array.isArray(factDescription) ? (
        <SanityBlockContent text={factDescription} />
      ) : (
        <p>{factDescription}</p>
      )}
    </div>
  );
};

export default Fact;