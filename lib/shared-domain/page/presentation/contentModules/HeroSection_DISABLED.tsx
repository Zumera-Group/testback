import React, { useEffect, useState } from 'react';

import { FlexCol } from 'components/Layout/Flex/Flex';
import { HeroSectionModule } from '../../domain/contentModule';
import { H } from 'components/Typography/H';
import { colors } from '../../../../../styles/foundations/colors';
import { Button } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { Box, FlexRow } from '../../../../../components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { SanityBlockContent } from 'components/SanityBlockContent';
import { SlotMachineAnimation } from '../../../../animations/SlotMachineAnimation';
// import { getHeroBackground } from './getHeroBackground';
import { useCareerRef } from '../../infrastructure/useCareerRef';
import Link from 'next/link';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
import { useFetchSectors } from '../../../sectors/application/useGetSectors';
import { useFetchServices } from '../../../services/application/useGetServices';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { LinkWithArrow } from '../components/LinkWithArrow';

const DEFAULT_SECTOR_EN = 'Automotive';
const DEFAULT_SERVICE_EN = 'Buy-side M&A';
const DEFAULT_SECTOR_DE = 'Automobilindustrie';
const DEFAULT_SERVICE_DE = 'Unternehmenskauf';

const SlotMachineHeading: React.FC<{
  title1: string;
  title2: string;
}> = ({ title1, title2 }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 5000);
    () => clearTimeout(timeout);
  }, []);
  const sectors = useFetchSectors();
  const services = useFetchServices();
  const { locale } = useRouter();

  const defaultSector = locale === 'de' ? DEFAULT_SECTOR_DE : DEFAULT_SECTOR_EN;
  const defaultService =
    locale === 'de' ? DEFAULT_SERVICE_DE : DEFAULT_SERVICE_EN;

  return (
    <Box key={sectors.length + services.length}>
      <Box className="showDesktop">
        <FlexRow w="100%" align="flex-start" mb={3}>
          <H
            mr={2}
            className="slotMachineHeading"
            as="h1"
            color={colors.primary.darkGreen}
          >
            {title1}
          </H>
          {show ? (
            <SlotMachineAnimation data={sectors} />
          ) : (
            <Box height={70}>
              <H
                as="h1"
                className="slotMachineHeading"
                color={colors.primary.lightGreen}
                whiteSpace="nowrap"
              >
                {defaultSector}
              </H>
            </Box>
          )}
        </FlexRow>
        <FlexRow w="100%" align="flex-start" mb={3}>
          <H
            mr={2}
            className="slotMachineHeading"
            as="h1"
            color={colors.primary.darkGreen}
          >
            {title2}
          </H>
          {show ? (
            <SlotMachineAnimation data={services} />
          ) : (
            <Box height={70}>
              <H
                as="h1"
                className="slotMachineHeading"
                color={colors.primary.lightGreen}
                whiteSpace="nowrap"
              >
                {defaultService}
              </H>
            </Box>
          )}
        </FlexRow>
      </Box>
      <Box w="100%">
        <Box className="showMobile">
          <Box w="100%" mb={3}>
            <Box width="100%">
              <H
                width="100%"
                mr={2}
                className="slotMachineHeading"
                as="h1"
                color={colors.primary.darkGreen}
              >
                {title1}
              </H>
            </Box>
            {show ? (
              <SlotMachineAnimation data={sectors} />
            ) : (
              <Box height={65}>
                <H
                  as="h1"
                  className="slotMachineHeading"
                  color={colors.primary.lightGreen}
                  whiteSpace="nowrap"
                >
                  {defaultSector}
                </H>
              </Box>
            )}
          </Box>
          <Box w="100%" mb={3}>
            <Box width="100%">
              <H
                width="100%"
                mr={2}
                className="slotMachineHeading"
                as="h1"
                color={colors.primary.darkGreen}
              >
                {title2}
              </H>
            </Box>
            {show ? (
              <SlotMachineAnimation data={services} />
            ) : (
              <Box height={65}>
                <H
                  as="h1"
                  className="slotMachineHeading"
                  color={colors.primary.lightGreen}
                  whiteSpace="nowrap"
                >
                  {defaultService}
                </H>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const HeroSection: React.FC<{
  specificContentModule: HeroSectionModule;
}> = ({ specificContentModule }) => {
  const isBigScreen = useBreakpointValue({ base: false, xxl: true });
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobileBg = useBreakpointValue({ base: true, sm: false });
  const isJobLanding = false;
  // specificContentModule.type === 'job-landing';
  const isHome = specificContentModule.type === 'home';
  // @ts-ignore
  const isLevel2 = specificContentModule.type === 'level2';
  // @ts-ignore
  const isLevel1 = specificContentModule.type === 'level1';
  const isTransaction = specificContentModule.type === 'transaction';
  // @ts-ignore
  const isAboutUs = specificContentModule.type === 'about-us';
  const isCareer = false;
  // specificContentModule.type === 'career';
  // @ts-ignore
  const isNews = specificContentModule.type === 'news';
  const isTermsAndConditions = false;
  // specificContentModule.type === 'termsAndConditions';
  const mobileBgImage = specificContentModule.heroMobileBgImage;
  const { sectionRef } = useCareerRef();

  const getDefaultBGColor = () => {
    if (isCareer || isTermsAndConditions || isNews) return colors.white;
    if (isLevel2 || isTransaction) return colors.white;
    return colors.primary.darkGreen;
  };
  const getButtonVariant = () => {
    if (isCareer || isTermsAndConditions || isNews) return 'primary';
    if (isLevel2 || isTransaction) return 'primary';
    return 'white';
  };

  const classForDescription =
    isLevel2 || isTransaction || isNews || isCareer || isTermsAndConditions
      ? 'heroDescriptionWorkaroundDarker'
      : 'heroDescriptionWorkaround';
  const classForTitle =
    isLevel2 || isTransaction || isNews || isCareer || isTermsAndConditions
      ? 'heroTitleWorkaroundDarker'
      : 'heroTitleWorkaround';

  const getHeroMinHeight = () => (isBigScreen ? '60vh' : '100vh');

  const getMarginTop = () => {
    if (isLevel2 || isLevel1) return 4;
  };

  // const getImage = getHeroBackground(
  //   isAboutUs || isCareer || isHome || isJobLanding || mobileBgImage !== null,
  //   isMobileBg,
  //   specificContentModule,
  // );

  const getImage = '';

  const linkWithCurrentLocale = useLinkWithCurrentLocale();

  return (
    <>
      <Head>
        <link rel="preload" href={getImage} as="image" />
      </Head>
      <FlexCol
        width="100%"
        justifyContent="center"
        pt={{ base: 10, md: 5 }}
        pb={{ base: 5, md: 2 }}
        minHeight={getHeroMinHeight()}
        backgroundImage={`url(${getImage})`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundAttachment={!isMobile && 'fixed'}
        backgroundColor={getDefaultBGColor()}
      >
        <SectionContainer>
          {isTransaction ? (
            <Box width={{ base: '100%', xl: '100%' }}>
              <SlotMachineHeading
                title1={specificContentModule.title}
                title2={specificContentModule.title2}
              />
              <Box className={classForDescription}>
                <SanityBlockContent text={specificContentModule.description} />
              </Box>
            </Box>
          ) : (
            <>
              <Box>
                <Box className={classForTitle}>
                  <H
                    // color={
                    //   isJobLanding &&
                    //   `${colors.primary.lighterGreen} !important`
                    // }
                    mt={getMarginTop()}
                    as="h1"
                    mb={3}
                  >
                    {specificContentModule.title}
                  </H>
                </Box>
                <Box className={classForDescription}>
                  <SanityBlockContent
                    text={specificContentModule.description}
                  />
                </Box>
              </Box>
              {specificContentModule?.button?.title &&
              (specificContentModule?.button?.link ||
                specificContentModule?.button?.externalUrl) &&
              !isCareer ? (
                <Box mt={4}>
                  {specificContentModule?.button?.type === 'underline' ? (
                    <LinkWithArrow
                      color={
                        getButtonVariant() === 'primary'
                          ? colors.black
                          : colors.white
                      }
                      title={specificContentModule.button.title}
                      href={
                        !specificContentModule?.button?.externalUrl
                          ? linkWithCurrentLocale(
                              specificContentModule.button.link.slug.current,
                            )
                          : specificContentModule?.button?.externalUrl
                      }
                    />
                  ) : (
                    <Link
                      passHref
                      href={
                        !specificContentModule?.button?.externalUrl
                          ? linkWithCurrentLocale(
                              specificContentModule.button.link.slug.current,
                            )
                          : specificContentModule?.button?.externalUrl
                      }
                    >
                      <Button
                        cursor="pointer"
                        as="a"
                        variant={getButtonVariant()}
                      >
                        {specificContentModule.button.title}
                      </Button>
                    </Link>
                  )}
                </Box>
              ) : null}
              {specificContentModule?.button?.title && isCareer ? (
                <Button
                  mt={4}
                  variant="primary"
                  onClick={() => {
                    globalThis?.window?.scrollTo({
                      top: sectionRef.current.offsetTop - 100,
                      behavior: 'smooth',
                    });
                  }}
                >
                  {specificContentModule.button.title}
                </Button>
              ) : null}
            </>
          )}
        </SectionContainer>
      </FlexCol>
    </>
  );
};

export default HeroSection;
