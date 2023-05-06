import styles from './TextBlock.module.scss';
import { PortableText } from '@portabletext/react';
export const TextBlock: React.FC<any> = ({ specificContentModule }) => {
  const { subheading, text } = specificContentModule;
  console.log(text);
  return (
    <div className={styles.textBlock}>
      {subheading && <h4>{subheading}</h4>}
      <PortableText
        value={text}
        // components={/* optional object of custom components to use */}
      />
    </div>
  );
};
