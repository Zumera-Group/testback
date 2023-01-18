import Link from 'next/link';
import { links } from 'lib/links';
import styles from './Fact.module.scss';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { Fact as IFact } from 'lib/shared-domain/page/domain/index';

interface Props {
  as?: '' | 'div' | 'li';
  fact?: IFact;
}

export const Fact: React.FC<Props> = ({ as, fact }) => {
  const Component = as || 'div';
  const { factTitle, factSubtitle, factDescription } = fact;
  return (
    <Component className={styles.service}>
      <div className={styles.fact}>
        {factTitle && <h5 className={styles.name}>{factTitle}</h5>}
        {factSubtitle && <p className={styles.description}>{factSubtitle}</p>}
        <SanityBlockContent text={factDescription} />
      </div>
    </Component>
  );
};

export default Fact;
