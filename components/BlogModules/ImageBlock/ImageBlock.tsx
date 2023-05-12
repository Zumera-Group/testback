import { Container, Grid } from 'components/Layout';
import styles from './ImageBlock.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const SplitScreen = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll position
      const scrollTop = containerRef.current.scrollTop;

      // Update the scroll position of the opposite pane
      const oppositePane = containerRef.current.querySelector('.oppositepane');
      oppositePane.scrollTop = scrollTop;
    };

    // Add scroll event listener
    containerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up the event listener
      containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.splitscreen} ref={containerRef}>
      <div className={styles.pane}>
        <p>LEFT</p>
      </div>
      <div
        className={[styles.pane, styles.oppositepane, `oppositepane`].join(' ')}
      >
        <p>RIGHT</p>
      </div>
    </div>
  );
};

export const ImageBlock: React.FC<any> = ({ specificContentModule }) => {
  const { image, caption } = specificContentModule;
  console.log(image);
  return (
    <>
      {' '}
      <Container classes={styles.imageBlockWrapper}>
        {/* <Grid> */}
        <figure className={styles.figure}>
          <Image
            unoptimized
            src={sanityImageUrlFor(image?.asset?.url).url()}
            alt={image?.alt}
            width={955}
            height={538}
            style={{
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
          {caption && (
            <figcaption className={styles.caption}>{caption}</figcaption>
          )}
        </figure>
        {/* </Grid> */}
      </Container>
      <SplitScreen />
    </>
  );
};
