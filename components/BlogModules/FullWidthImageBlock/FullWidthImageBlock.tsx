import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './FullWidthImageBlock.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import Image from 'next/image';

export const FullWidthImageBlock: React.FC<any> = ({
  specificContentModule,
}) => {
  const { image, caption, anchor } = specificContentModule;

  return (
    <Container classes={styles.fullImageBlockWrapper} id={anchor}>
      <figure className={styles.figure}>
        <Image
          unoptimized
          src={sanityImageUrlFor(image?.asset?.url).url()}
          alt={image?.alt}
          width={1280}
          height={549}
          style={{
            maxWidth: '100%',
            objectFit: 'cover',
            width: '100%',
          }}
        />

        <div className={styles.captionWrapper}>
          <Grid
            fullWidth={true}
            justifyContent={'space-between'}
            className={styles.content}
          >
            <GridColumn sm={12} md={6} lg={12}>
              {caption && (
                <figcaption className={styles.caption}>{caption}</figcaption>
              )}
            </GridColumn>
          </Grid>
        </div>
      </figure>
    </Container>
  );
};

export default FullWidthImageBlock;
