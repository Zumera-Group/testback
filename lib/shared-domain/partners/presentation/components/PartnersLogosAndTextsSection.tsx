import Image from 'next/image';
import styles from './PartnersLogosAndTextsSection.module.css';
import { PartnerLogosAndTextsModule } from '../../../page/domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../../page/presentation/components/TitleWithSubtitleAndDescription';
import { P } from '../../../../../components/Typography/P';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import { colors } from '../../../../../styles/foundations/colors';
import { FlexCol } from '../../../../../components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';

export const PartnersLogosAndTextsSection: React.FC<{
  specificContentModule: PartnerLogosAndTextsModule;
}> = ({ specificContentModule }) => {
  const logosUrls = [
    specificContentModule.logo1?.asset?.url,
    specificContentModule.logo2?.asset?.url,
    specificContentModule.logo3?.asset?.url,
  ];
  const hasLogos = logosUrls[0] || logosUrls[1] || logosUrls[2];

  return (
    <SectionContainer py="xs">
      <section className={styles.section}>
        <FlexCol>
          <TitleWithSubtitleAndDescription
            subtitle={specificContentModule.subtitle}
            title={specificContentModule.title}
          />

          <div className="bp-desktop">
            <P fontSize={fontSizes.h3} color={colors.text.light}>
              {specificContentModule.firstText}
            </P>
            <P fontSize={fontSizes.h3} mt={4} color={colors.text.light}>
              {specificContentModule.secondText}
            </P>
          </div>

          <div className="bp-mobile">
            <P
              fontSize={fontSizes.h3}
              color={colors.text.light}
              fontWeight="bold"
            >
              {specificContentModule.firstText}
            </P>
            <P fontSize={fontSizes.h3} mt={4} color={colors.text.light}>
              {specificContentModule.secondText}
            </P>
          </div>
        </FlexCol>

        {hasLogos && (
          <div className={styles.iconsWrapper}>
            {logosUrls.map((l) => {
              return l ? (
                <div className={styles.iconContainer}>
                  <Image
                    layout="fill"
                    key={l}
                    unoptimized
                    src={l}
                    objectFit="scale-down"
                  />
                </div>
              ) : null;
            })}
          </div>
        )}
      </section>
    </SectionContainer>
  );
};
