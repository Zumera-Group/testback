import styles from './TextBlock.module.scss';
import { RichText } from '../RichText';

export const TextBlock: React.FC<any> = ({ specificContentModule }) => {
  const { subheading, text } = specificContentModule;

  return (
    <div className={styles.textBlock}>
      {subheading && <h4>{subheading}</h4>}
      <RichText content={text} />
    </div>
  );
};
export default TextBlock;
