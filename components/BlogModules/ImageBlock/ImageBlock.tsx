import { Container } from 'components/Layout';
import styles from './ImageBlock.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import Image from 'next/image';
import { HiddenAnchor } from 'components/BlogModules/HiddenAnchor/HiddenAnchor';

export const ImageBlock: React.FC<any> = ({ specificContentModule }) => {
  const { image, caption, anchor } = specificContentModule;

  const imageUrl = image?.asset?.url;
  if (!imageUrl) {
    return null;
  }

  return (
    <>
      <HiddenAnchor id={anchor} />

      <Container classes={styles.imageBlockWrapper}>
        <figure className={styles.figure}>
          <Image
            unoptimized
            src={sanityImageUrlFor(imageUrl).url()}
            alt={image?.alt}
            width={1280}
            height={549}

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
    </>
  );
};

export default ImageBlock;
