import React from 'react';
import Image from 'next/image';
import { IndustryReportSectionModule } from '../../domain/contentModule';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../../styles/foundations/colors';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import { Flex } from '@chakra-ui/layout';
import { Box } from '../../../../../components/Layout/Flex/Flex';
import { SanityBlockContent } from '../../../../../components/SanityBlockContent';
import { P } from 'components/Typography/P';
import { CardDownload } from '../../../newsArticle/presentation/newsCards';
// import industryReportbgImage from '../../../../../public/contentModules/industryReportSection/bg.jpg';
// import industryReportbgMobileImage from '../../../../../public/contentModules/industryReportSection/bg-mobile.jpg';

export const IndustryReportSection: React.FC<{
  specificContentModule: IndustryReportSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, xl: false });
  const showImageBelow = useBreakpointValue({
    base: false,
    md: true,
    xl: false,
  });

  return (
    <FlexCol
      // backgroundImage={
      //   isMobile
      //     ? `url(${industryReportbgMobileImage.src})`
      //     : `url(${industryReportbgImage.src})`
      // }
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <SectionContainer py={isMobile ? 'sm' : 'lg'}>
        <FlexRow align="start" justify="space-between" position="relative">
          <FlexCol
            w={isMobile ? '100%' : '60%'}
            position="relative"
            zIndex="40"
          >
            <TitleWithSubtitleAndDescription
              subtitle={specificContentModule.industryReport?.subtitle}
              title={specificContentModule.industryReport?.title}
              color={{
                title: colors.white,
                subtitle: colors.white,
              }}
            />
            <P
              whiteSpace="pre-wrap"
              color={colors.white}
              fontSize={fontSizes.h2}
              w={isMobile ? '100%' : '80%'}
            >
              <SanityBlockContent
                text={specificContentModule.industryReport?.description}
              />
            </P>
            <Box w={{ base: '100%', lg: '60%' }} mt={6}>
              <CardDownload
                noBg
                hideIconBtn
                padding={0}
                btnWidth={isMobile ? '100%' : '60%'}
                content={{
                  buttonCaption:
                    specificContentModule.industryReport?.downloadSection
                      ?.buttonText,
                  emailLabel:
                    specificContentModule.industryReport?.downloadSection
                      ?.emailPlaceholder,
                  file: specificContentModule.industryReport?.file,
                }}
              />
            </Box>
          </FlexCol>
          {!isMobile && specificContentModule.industryReport?.image && (
            <Box position="absolute" right={-10} top={15}>
              <Image
                unoptimized
                src={specificContentModule.industryReport?.image?.asset?.url}
                alt=""
                height={545}
                width={660}
              />
            </Box>
          )}
        </FlexRow>
        {showImageBelow && specificContentModule.industryReport?.image && (
          <Flex w="100%" align="center" justify="center" mt={10}>
            <Image
              unoptimized
              src={specificContentModule.industryReport?.image?.asset?.url}
              alt=""
              height={545}
              width={660}
            />
          </Flex>
        )}
      </SectionContainer>
      ;
    </FlexCol>
  );
};
