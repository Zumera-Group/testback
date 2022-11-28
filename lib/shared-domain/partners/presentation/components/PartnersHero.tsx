import React from 'react';
import Image from 'next/image';
import styles from './PartnersHero.module.css';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { Button } from '@chakra-ui/react';
import { PartnerHeroModule } from '../../../page/domain/contentModule';
import PartnersHeroBg from './PartnersHeroBg.png';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';

import { colors } from 'styles/foundations/colors';

export const PartnersHero: React.FC<{
  specificContentModule: PartnerHeroModule;
}> = ({ specificContentModule }) => {
  const colorsHero = {
    title: colors.primary.darkGreen,
  };

  return (
    <section
      className={styles.sectionContainer}
      style={{
        backgroundImage: `url(${PartnersHeroBg.src})`,
        width: '100%',
      }}
    >
      <SectionContainer>
        <section className={styles.section}>
          <section className={styles.sectionLeft}>
            <TitleWithSubtitleAndDescription
              title={specificContentModule.title}
              description={specificContentModule.subtitle}
              color={colorsHero}
            />
            <Button
              href={specificContentModule.buttonUrl}
              className={styles.ContactButton}
              width="300px"
              cursor="pointer"
              as="a"
              variant="solid"
            >
              {specificContentModule.buttonCaption}
            </Button>
          </section>

          <div className={styles.sectionRight}>
            <div className={styles.whiteImageBlock}>
              {specificContentModule.heroPartnerLogo?.asset?.url && (
                <Image
                  unoptimized
                  src={specificContentModule.heroPartnerLogo.asset.url}
                  width={482}
                  height={159}
                  objectFit="contain"
                  alt=""
                />
              )}
            </div>
          </div>
        </section>
      </SectionContainer>
    </section>
  );
};
