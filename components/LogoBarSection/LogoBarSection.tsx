import styles from './LogoBarSection.module.scss';
import { LogoBarSectionModule } from 'lib/shared-domain/page/domain/contentModule';
import Marquee from 'react-fast-marquee';
import { SectionHeading } from 'components/SectionHeading';
import { Section } from 'components/Layout';
import { useMediaQuery } from 'lib/hooks/useMediaQuery';
import { SCREEN_SIZE_MD } from 'lib/constants';

export const LogoBarSection: React.FC<{
  specificContentModule: LogoBarSectionModule;
}> = ({ specificContentModule }) => {
  const { title, logos } = specificContentModule;
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);
  const speed = isMobile ? 50 : 70;
  return (
    <Section
      as={'section'}
      size={'sm'}
      color={'primary'}
      id={title.replaceAll(' ', '-')}
    >
      <SectionHeading title={title} headingType={'h3'} align={'center'} />
      <div className={styles.logoContainer}>
        <Marquee speed={speed} gradient={false}>
          {logos.map((item, index) => {
            return (
              <div className={styles.logo} key={index}>
                <img src={item.asset.url} />
              </div>
            );
          })}
        </Marquee>
      </div>
    </Section>
  );
};

export default LogoBarSection;
