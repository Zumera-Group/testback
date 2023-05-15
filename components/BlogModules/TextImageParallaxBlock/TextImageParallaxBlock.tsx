import React, { useState, useEffect, useRef } from 'react';
import { Container, Grid, GridColumn } from 'components/Layout';
import styles from './TextImageParallaxBlock.module.scss';
import { sanityImageUrlFor } from 'lib/sanity';
import Image from 'next/image';
import RichText from '../RichText/RichText';

export const TextImageParallaxBlock: React.FC<any> = ({
  specificContentModule,
}) => {
  const { imageSection, textSection } = specificContentModule;
  const { headline, summary, image, caption } = imageSection;

  return (
    <Container classes={styles.imageTextParallaxWrapper}>
      <Grid
        justifyContent={'space-between'}
        alignItems={'start'}
        fullWidth={true}
      >
        <GridColumn sm={12} md={6} lg={7} className={styles.leftPane}>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.summary}>{summary}</p>
          <figure className={styles.figure}>
            <Image
              unoptimized
              src={sanityImageUrlFor(image?.asset?.url).url()}
              alt={image?.alt}
              width={736}
              height={414}
              style={{
                maxWidth: '100%',
                objectFit: 'cover',
              }}
            />
            {caption && (
              <figcaption className={styles.caption}>{caption}</figcaption>
            )}
          </figure>
        </GridColumn>
        <GridColumn sm={12} md={6} lg={4} className={styles.rightPane}>
          {textSection?.map((section, index) => (
            <div className={styles.textBlock} key={index}>
              <h4 className={styles.subheading}>{section?.subheading}</h4>
              <div className={styles.content}>
                <RichText content={section.text} />
              </div>
            </div>
          ))}
        </GridColumn>
      </Grid>
    </Container>
  );
};

export default TextImageParallaxBlock;
