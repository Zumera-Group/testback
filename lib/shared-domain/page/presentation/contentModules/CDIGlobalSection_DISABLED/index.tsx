/* eslint-disable @next/next/no-img-element */
import React from 'react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { Box, FlexCol } from '../../../../../../components/Layout/Flex/Flex';
import { CDIGlobalSectionModule } from '../../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../../components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../../../styles/foundations/colors';
import { P } from '../../../../../../components/Typography/P';
import { LinkWithArrow } from '../../components/LinkWithArrow';

import Lottie from 'react-lottie';
import * as animationData from './map.json';
import { useOnElementIntersecting } from 'lib/hooks/useOnElementIntersecting';

const TEXT_COLORS = {
  title: colors.white,
  subtitle: colors.text.lightest,
  description: colors.text.lightest,
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const CDIGlobalSection: React.FC<{
  specificContentModule: CDIGlobalSectionModule;
}> = ({ specificContentModule }) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isHeader = specificContentModule.sectionType === 'header';

  const showMoreButton =
    specificContentModule.button?.page?.slug?.current &&
    specificContentModule.button?.text;

  const [containerRef, isVisible] = useOnElementIntersecting({
    threshold: 0,
    rootMargin: '0px 0px -20px 0px',
  });

  return (
    <></>
    // <FlexCol
    //   justifyContent="space-between"
    //   minHeight={isHeader && '60vh'}
    //   position="relative"
    //   bg={isMobile ? '#193832' : '#1D3B38'}
    //   width="100%"
    //   ref={containerRef}
    // >
    //   {!isMobile && (
    //     <div
    //       style={{
    //         position: 'absolute',
    //         left: 0,
    //         top: isHeader ? 80 : 146,
    //         pointerEvents: 'none',
    //         marginLeft: '40%',
    //       }}
    //     >
    //       {isVisible && (
    //         <Lottie
    //           options={defaultOptions}
    //           height="100%"
    //           width={isHeader ? '100%' : '100%'}
    //           style={{ maxWidth: 1200 }}
    //           isStopped={false}
    //           isPaused={false}
    //         />
    //       )}
    //     </div>
    //   )}

    //   <Box position="relative" mt={isHeader && 10} zIndex={100}>
    //     <SectionContainer py="md">
    //       <Box mb={{ base: 0, md: 8 }} width={{ base: '100%', lg: '50%' }}>
    //         <TitleWithSubtitleAndDescription
    //           {...specificContentModule}
    //           color={TEXT_COLORS}
    //         />
    //       </Box>
    //       {!isMobile && !isHeader && (
    //         <Box maxW={340}>
    //           <P color={TEXT_COLORS.description} variant="cdiGlobalP">
    //             {specificContentModule.locations.reduce(
    //               (prevCity, currCity) => `${prevCity} | ${currCity}`,
    //             )}
    //           </P>
    //         </Box>
    //       )}
    //       {isMobile && (
    //         <Box height="300px" paddingRight={3} overflow="hidden">
    //           {isVisible && (
    //             <Lottie
    //               options={defaultOptions}
    //               height="100%"
    //               width="100vw"
    //               style={{ paddingRight: 32 }}
    //               isStopped={false}
    //               isPaused={false}
    //             />
    //           )}
    //         </Box>
    //       )}
    //       {showMoreButton && (
    //         <Box mt={{ base: 0, md: 7 }} zIndex={100}>
    //           <LinkWithArrow
    //             color={colors.white}
    //             title={specificContentModule.button?.text}
    //             href={specificContentModule.button?.page?.slug?.current}
    //           />
    //         </Box>
    //       )}
    //     </SectionContainer>
    //     {isHeader && !isMobile && (
    //       <SectionContainer>
    //         <Box mb={6} maxWidth="60%">
    //           <P color={TEXT_COLORS.description} variant="cdiGlobalP">
    //             {specificContentModule.locations.reduce(
    //               (prevCity, currCity) => `${prevCity} | ${currCity}`,
    //             )}
    //           </P>
    //         </Box>
    //       </SectionContainer>
    //     )}
    //   </Box>
    // </FlexCol>
  );
};

export default CDIGlobalSection;
