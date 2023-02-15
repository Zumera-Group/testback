import Image from 'next/image';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import styles from './DividerImage.module.scss';
import { Container, Section } from 'components/Layout';

interface Props {
  dividerImage?: string;
  isInContainer?: boolean;
  isNoParalax?: boolean;
}

export const DividerImage: React.FC<Props> = ({ ...rest }) => {
  const { dividerImage, isInContainer, isNoParalax } = rest;
  const { ref, inView } = useInView();
  const imageRef = useRef(null);
  const strength = 15;
  useEffect(() => {
    if (!imageRef) return;
    const handleScroll = () => {
      const scroll = window.scrollY;
      const offset =
        imageRef.current?.parentElement.getBoundingClientRect().top +
        scroll -
        window.innerHeight;
      const distanceToObject = offset - scroll;
      const distanceToMove =
        window.innerHeight + imageRef.current?.parentElement.offsetHeight;
      const percentageToMove =
        strength + ((strength * 2) / distanceToMove) * distanceToObject;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(-50%) translate3d(0,${
          percentageToMove * -1
        }%,0)`;
      }
    };
    if (inView) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, imageRef]);

  if (!dividerImage) return null;

  const getImageComponent = () => (
    <div className={styles.dividerImage} ref={ref}>
      <div
        className={styles.dividerImage_inner}
        ref={imageRef}
        style={{
          height: isNoParalax ? '100%' : 100 + strength + '%',
        }}
      >
        <Image
          loading="lazy"
          unoptimized
          // objectFit={isNoParalax ? 'contain' : 'cover'}
          // objectPosition="center"
          // layout="fill"
          alt={''}
          src={dividerImage + `?h=1200`}
        />
      </div>
    </div>
  );

  return isInContainer ? (
    <Section size={'md'} bg={'light'} color={'white'}>
      <Container classes={styles.container}>{getImageComponent()}</Container>
    </Section>
  ) : (
    getImageComponent()
  );
};

export default DividerImage;
