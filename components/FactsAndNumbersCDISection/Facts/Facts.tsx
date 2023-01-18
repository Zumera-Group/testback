import { Fact } from './Fact';
import { Fact as IFact } from 'lib/shared-domain/page/domain/index';
import styles from './Facts.module.scss';

interface Props {
  facts?: IFact[];
}

export const Facts: React.FC<Props> = ({ facts }) => {
  if (!facts) return null;
  return (
    <ul className={styles.facts}>
      {facts?.map((fact, index) => (
        <Fact key={`service-${fact?._id || index}`} as={'li'} fact={fact} />
      ))}
    </ul>
  );
};

export default Facts;
