import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBreakpointValue, VStack, Flex, Hide, Show } from '@chakra-ui/react';
import { Btn } from 'components/Buttons/Button';
import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { TextBoxGroup } from './TextBoxGroup';

import resultTeaser from '../../../../public/contentModules/calculatorTeaserSection/result_teaser.svg';
import { FlexCol } from '../../../../components/Layout/Flex/Flex';
import { useRouter } from 'next/router';

const LineSpacerMobile = () => {
  return (
    <Box
      position="relative"
      h={1}
      w={6}
      borderBottom={`1px solid ${colors.text.light}`}
    ></Box>
  );
};

const TeaserBoxDesktop: React.FC<{ borderColor: string }> = ({
  borderColor,
  children,
}) => {
  const BOX_SPACE_HEIGHT = '25%';
  return (
    <FlexRow h={BOX_SPACE_HEIGHT}>
      <Box
        w={8}
        mr={{ md: 6, lg: 5 }}
        borderBottom={`1px solid ${borderColor}`}
      ></Box>
      <Flex align="center" justify="center">
        {children}
      </Flex>
    </FlexRow>
  );
};

export const ResultTeaser: React.FC<{
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  isSectorSpecificEntry?: boolean;
}> = ({ calculatorSteps, isSectorSpecificEntry }) => {
  const BOX_SHADOW = '0px 20px 40px rgba(12, 78, 64, 0.35)';
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const MOBILE_VARIANT = 'mobileCalculatorTeaserSectionP';
  const DESKTOP_VARIANT = 'websiteCalculatorTeaserSectionP';
  const isMobileOrisSectorSpecificEntry = isMobile || isSectorSpecificEntry;
  return (
    <FlexRow
      boxShadow={isSectorSpecificEntry ? '' : BOX_SHADOW}
      bgColor={isSectorSpecificEntry ? colors.transparent : colors.white}
      px={isMobile ? 2 : 5}
      py={isMobile ? 5 : 7}
      w={isMobileOrisSectorSpecificEntry ? '100%' : '60%'}
      mt={isMobile ? 8 : 0}
      justify={isMobileOrisSectorSpecificEntry ? 'center' : 'flex-start'}
    >
      {resultTeaser.src && (
        <Image
          unoptimized
          loading="lazy"
          src={resultTeaser.src}
          alt=""
          height={isMobile ? '150px' : '270px'}
          width={isMobile ? '115px' : '215px'}
        />
      )}
      <Hide below="md">
        <FlexCol ml={{ md: 6, lg: 3 }}>
          <TeaserBoxDesktop borderColor={colors.text.light}>
            <P variant={DESKTOP_VARIANT}>{calculatorSteps?.step4}</P>
          </TeaserBoxDesktop>
          <TeaserBoxDesktop borderColor={colors.text.light}>
            <P variant={DESKTOP_VARIANT}>{calculatorSteps?.step3}</P>
          </TeaserBoxDesktop>
          <TeaserBoxDesktop borderColor={colors.text.light}>
            <P variant={DESKTOP_VARIANT} color={colors.primary.darkGreen}>
              {calculatorSteps?.step2}
            </P>
          </TeaserBoxDesktop>
          <TeaserBoxDesktop borderColor="transparent">
            <P variant={DESKTOP_VARIANT} color={colors.primary.darkGreen}>
              {calculatorSteps?.step1}
            </P>
          </TeaserBoxDesktop>
        </FlexCol>
      </Hide>
      <Show below="md">
        <VStack
          ml={{ base: 2, sm: 7 }}
          spacing={isMobile ? 1.5 : 3}
          align="flex-start"
        >
          <P variant={MOBILE_VARIANT}>{calculatorSteps?.step4}</P>
          <LineSpacerMobile />
          <P variant={MOBILE_VARIANT}>{calculatorSteps?.step3}</P>
          <LineSpacerMobile />
          <P variant={MOBILE_VARIANT} color={colors.primary.darkGreen}>
            {calculatorSteps?.step2}
          </P>
          <LineSpacerMobile />
          <P variant={MOBILE_VARIANT} color={colors.primary.darkGreen}>
            {calculatorSteps?.step1}
          </P>
        </VStack>
      </Show>
    </FlexRow>
  );
};

export const CalculatorTeaser: React.FC<{
  title: string;
  description: any[] | string;
  buttonText: string;
  checkmarkTexts: string[];
  calculatorSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  questionnaireSlug?: string;
}> = ({
  title,
  description,
  checkmarkTexts,
  questionnaireSlug,
  buttonText,
  calculatorSteps,
}) => {
  const CIRCLE_BORDER = `1px solid ${colors.primary.darkGreen}`;
  const MARGIN_TOP = 6.5;
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';
  if (!questionnaireSlug) return null;

  return (
    <SectionContainer py={isMobile ? 'md' : 'lg'}>
      <TitleWithSubtitleAndDescription
        color={{ description: colors.text.light }}
        title={title}
        description={description}
      />
      <Flex
        justify={isMobile ? 'flex-start' : 'space-between'}
        alignItems="flex-start"
        mt={MARGIN_TOP}
      >
        <FlexCol
          width={{ base: '100%', lg: '35%' }}
          mr={5}
          mt={{ base: 4.5, lg: MARGIN_TOP }}
        >
          <VStack spacing={3} align="flex-start">
            {checkmarkTexts?.map((c, index) => (
              <TextBoxGroup
                key={index}
                text={c}
                color={{
                  tickColor: colors.primary.darkGreen,
                  circleBgColor: colors.transparent,
                }}
                border={CIRCLE_BORDER}
              />
            ))}
          </VStack>
          <Box mt={4.5}>
            <Link passHref href={`/${page}/${questionnaireSlug}`}>
              <Btn
                aria-label="Go to questionnaire button"
                as="a"
                cursor="pointer"
                variant="solid"
              >
                {buttonText}
              </Btn>
            </Link>
          </Box>
        </FlexCol>
        <Hide below="lg">
          <ResultTeaser calculatorSteps={calculatorSteps} />
        </Hide>
      </Flex>
      <Show below="lg">
        <ResultTeaser calculatorSteps={calculatorSteps} />
      </Show>
    </SectionContainer>
  );
};
