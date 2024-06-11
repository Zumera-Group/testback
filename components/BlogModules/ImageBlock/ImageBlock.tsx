import { Container } from 'components/Layout';
import styles from './ImageBlock.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import Image from 'next/image';
import { HiddenAnchor } from 'components/BlogModules/HiddenAnchor/HiddenAnchor';
import { IImageBlockModule } from '../../../lib/shared-domain/blogArticle/domain/blogModule';

export const ImageBlock: React.FC<{specificContentModule: IImageBlockModule, defaultAlt?: string}> = ({
  specificContentModule,
  defaultAlt
}) => {
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
            alt={image?.alt || defaultAlt}
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
