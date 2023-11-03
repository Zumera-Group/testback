import styles from './LogoBarSection.module.scss';
import { LogoBarSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import Marquee from 'react-fast-marquee';
import { SectionHeading } from 'components/SectionHeading';
import { Section } from 'components/Layout';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';
import Image from 'next/image';
import { sanityImageUrlFor } from 'lib/sanity';

export const LogoBarSection: React.FC<{
  specificContentModule: LogoBarSectionModule;
}> = ({ specificContentModule }) => {
  const { title, logos } = specificContentModule;
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const speed = isMobile ? 50 : 70;
  const logoStartPos = isMobile ? 1 : 2;
  return (
    <Section
      as={'section'}
      size={'sm'}
      color={'primary'}
      id={title.replaceAll(' ', '-')}
      classes={styles.logoBarSection}
    >
      <div className={styles.logoContainer}>
        <Marquee speed={speed} gradient={false} autoFill>
          {logos.map((item, index) => {
            return (
              <div className={styles.logo} key={index}>
                {index === logoStartPos && (
                  <SectionHeading
                    title={title}
                    headingType={'h3'}
                    align={'center'}
                  />
                )}
                <Image
                  unoptimized
                  src={sanityImageUrlFor(item?.asset?.url).url()}
                  alt={item?.asset?.alt}
                  width={item.asset.metadata.dimensions.width}
                  height={item.asset.metadata.dimensions.height}
                  style={{
                    maxWidth: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            );
          })}
        </Marquee>
      </div>
    </Section>
  );
};

export default LogoBarSection;
