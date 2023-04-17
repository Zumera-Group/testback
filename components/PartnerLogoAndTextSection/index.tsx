import { Container, Grid, Section } from 'components/Layout';
import { SectionHeading } from 'components/SectionHeading';
import styles from './PartnerLogoAndTextSection.module.scss';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const PartnerLogoAndTextSection: React.FC<any> = ({
  specificContentModule,
}) => {
  const { title, subtitle, description, logo1, logo2, logo3 } =
    specificContentModule;
  return (
    <Section size={'md'} bg={'light'} color={'primary'}>
      <Container>
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
          headingType={'h2'}
          align={'center'}
        />
        <div className={styles.logosWrapper}>
          <div className={styles.logo}>
            <Image
              unoptimized
              src={sanityImageUrlFor(logo1?.asset?.url).url()}
              alt={'logo1'}
              fill
              style={{
                maxWidth: '100%',
              }}
            />
          </div>
          <div className={styles.logo}>
            <Image
              unoptimized
              src={sanityImageUrlFor(logo2?.asset?.url).url()}
              alt={'logo1'}
              fill
              style={{
                maxWidth: '100%',
              }}
            />
          </div>
          <div className={styles.logo}>
            <Image
              unoptimized
              src={sanityImageUrlFor(logo3?.asset?.url).url()}
              alt={'logo1'}
              fill
              style={{
                maxWidth: '100%',
              }}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};
