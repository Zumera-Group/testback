import { Grid } from '@chakra-ui/react';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import React from 'react';
import Image from 'next/image';

import { ValuationBenefitsSectionModule } from '../../domain/contentModule';

import { colors } from '../../../../../styles/foundations/colors';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { fontSizes } from 'styles/foundations/fontStyles';
import { P } from 'components/Typography/P';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Btn } from 'components/Buttons/Button';

export const ValuationBenefitsSection: React.FC<{
  specificContentModule: ValuationBenefitsSectionModule;
}> = ({ specificContentModule }) => {
  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';

  return (
    <SectionContainer py="lg">
      <FlexCol textAlign="center" maxWidth="700px" mx="auto">
        <TitleWithSubtitleAndDescription
          title={specificContentModule.title}
          description={specificContentModule.description}
        />
      </FlexCol>

      <Grid
        mt={100}
        templateColumns={{
          base: 'repeat(auto-fit, minmax(300px, 1fr))',
          xl: 'repeat(4, minmax(100px, 1fr))',
        }}
        gap={4}
      >
        {specificContentModule.iconRows?.map((s, index) => (
          <Box textAlign="center" key={index}>
            <FlexCol
              mx="auto"
              alignItems="center"
              justifyContent="center"
              mb={1}
              position="relative"
              width="50px"
              height="50px"
            >
              {s?.icon?.iconImage?.asset?.url && (
                <Box
                  width="50px"
                  height="50px"
                  position="relative"
                  pointerEvents="none"
                  cursor="not-allowed"
                >
                  <Image
                    unoptimized
                    objectFit="contain"
                    src={s.icon.iconImage.asset.url}
                    alt={``}
                    layout="fill"
                  />
                </Box>
              )}
            </FlexCol>
            <P
              color={colors.primary.darkGreen}
              mb={4}
              mt={4}
              fontSize={fontSizes.h1_2}
              fontWeight="600"
              whiteSpace="nowrap"
            >
              {s.title}
            </P>
            <P color={colors.text.light}>
              {Array.isArray(s.description) ? (
                <SanityBlockContent text={s.description} />
              ) : (
                s.description
              )}
            </P>
          </Box>
        ))}
      </Grid>

      {specificContentModule.questionnaireSlug &&
        specificContentModule.buttonText && (
          <FlexCol mt={8} alignItems="center">
            <Link
              passHref
              href={`/${page}/${specificContentModule.questionnaireSlug}`}
            >
              <Btn
                aria-label="Go to questionnaire button"
                as="a"
                cursor="pointer"
                variant="solid"
              >
                {specificContentModule.buttonText}
              </Btn>
            </Link>
          </FlexCol>
        )}
    </SectionContainer>
  );
};

export default ValuationBenefitsSection;
