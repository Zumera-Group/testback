import { Container, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './PartnerReviewSection.module.scss';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';
import { SanityBlockContent } from 'components/SanityBlockContent';
export const PartnerReviewSection: React.FC<any> = ({
  specificContentModule,
}) => {
  const { title, subtitle, partnerItem } = specificContentModule;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container classes={styles.container}>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          headingType={'h2'}
          align={'center'}
          classes={styles.heading}
        />
        <div className={styles.partnerItems}>
          {partnerItem?.map((item) => (
            <div key={item._key}>
              <div className={styles.partnerLogo}>
                <Image
                  unoptimized
                  src={sanityImageUrlFor(item?.image?.asset?.url).url()}
                  alt={'Person photo'}
                  fill
                  style={{
                    maxWidth: '100%',
                    objectFit: 'contain',
                    objectPosition: 'left',
                  }}
                />
              </div>
              <div>
                <SanityBlockContent text={item?.description} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
