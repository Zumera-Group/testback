import { Container, Grid } from 'components/Layout';
import styles from './ImageBlock.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import Image from 'next/image';

export const ImageBlock: React.FC<any> = ({ specificContentModule }) => {
  const { image, caption } = specificContentModule;

  return (
    <Container classes={styles.imageBlockWrapper}>
      <figure className={styles.figure}>
        <Image
          unoptimized
          src={sanityImageUrlFor(image?.asset?.url).url()}
          alt={image?.alt}
          width={955}
          height={538}
          style={{
            maxWidth: '100%',
            objectFit: 'cover',
          }}
        />
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
      </figure>
    </Container>
  );
};

export default ImageBlock;
