import React from 'react';
import { Container, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './PartnerPersonQuote.module.scss';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const PartnerPersonQuote: React.FC<any> = ({
  specificContentModule,
}) => {
  const { title, quoteText, quoteOwner, quoteOwnerPosition, image } =
    specificContentModule;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.container}>
        <SectionHeading
          title={title}
          headingType={'h2'}
          align={'center'}
          classes={styles.heading}
        />
        {image ? (
          <div className={styles.logo}>
            <Image
              unoptimized
              src={sanityImageUrlFor(image?.asset?.url).url()}
              alt={'Person photo'}
              fill
              style={{
                maxWidth: '100%',
              }}
            />
          </div>
        ) : null}
        <SectionHeading
          title={quoteText}
          headingType={'h4'}
          align={'center'}
          classes={styles.quoteText}
        />
        <SectionHeading
          title={quoteOwner}
          description={quoteOwnerPosition}
          headingType={'h4'}
          align={'center'}
          classes={styles.ownerPosition}
        />
      </Container>
    </Section>
  );
};
