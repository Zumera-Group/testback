import result_teaserReact from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { useBreakpointValue, VStack, Flex, Hide, Show } from '@chakra-ui/react';
// import { Btn } from 'components/Buttons/Button';
// import { Box, FlexRow } from 'components/Layout/Flex/Flex';
// import { SectionContainer } from 'components/Layout/SectionContainer';
import { P } from 'components/Typography/P';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { TextBoxGroup } from './TextBoxGroup';

// import resultTeaser from '../../../../public/contentModules/calculatorTeaserSection/result_teaser.svg';
// import { FlexCol } from '../../../../components/Layout/Flex/Flex';
import { useRouter } from 'next/router';
import { Beam } from 'components/Beam';
import styles from './CalculatorTeaser.module.scss';
import { HalfBeam } from 'components/HalfBeam';
//TODO: To delete

// const LineSpacerMobile = () => {
//   return (
//     <Box
//       position="relative"
//       h={1}
//       w={6}
//       borderBottom={`1px solid ${colors.text.light}`}
//     ></Box>
//   );
// };

// const TeaserBoxDesktop: React.FC<{}> = ({ children }) => {
//   const BOX_SPACE_HEIGHT = '25%';
//   return (
//     <FlexRow h={BOX_SPACE_HEIGHT}>
//       <Flex align="center" justify="center">
//         {children}
//       </Flex>
//     </FlexRow>
//   );
// };

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
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const MOBILE_VARIANT = 'mobileCalculatorTeaserSectionP';
  const DESKTOP_VARIANT = 'websiteCalculatorTeaserSectionP';
  // const isMobileOrisSectorSpecificEntry = isMobile || isSectorSpecificEntry;
  return null;
  // return (
  //   <FlexRow
  //     boxShadow={isSectorSpecificEntry ? '' : BOX_SHADOW}
  //     bgColor={isSectorSpecificEntry ? colors.transparent : colors.white}
  //     px={isMobile ? 2 : 5}
  //     py={isMobile ? 5 : 7}
  //     w={isMobileOrisSectorSpecificEntry ? '100%' : '60%'}
  //     mt={isMobile ? 8 : 0}
  //     className={styles.calculatorTeaserWrapper}
  //   >
  //     {/*{resultTeaser.src && <HalfBeam />}*/}
  //     {/*<Hide below="md">*/}
  //     {/*  <FlexCol ml={{ md: 6, lg: 3 }}>*/}
  //     {/*    <TeaserBoxDesktop>*/}
  //     {/*      <P variant={DESKTOP_VARIANT} className={styles.calculatorSteps}>*/}
  //     {/*        <span className={styles.dash}>&mdash;</span>*/}
  //     {/*        {calculatorSteps?.step4}*/}
  //     {/*      </P>*/}
  //     {/*    </TeaserBoxDesktop>*/}
  //     {/*    <TeaserBoxDesktop>*/}
  //     {/*      <P variant={DESKTOP_VARIANT} className={styles.calculatorSteps}>*/}
  //     {/*        <span className={styles.dash}>&mdash;</span>*/}
  //     {/*        {calculatorSteps?.step3}*/}
  //     {/*      </P>*/}
  //     {/*    </TeaserBoxDesktop>*/}
  //     {/*    <TeaserBoxDesktop>*/}
  //     {/*      <P variant={DESKTOP_VARIANT} className={styles.calculatorSteps}>*/}
  //     {/*        <span className={styles.dash}>&mdash;</span>*/}
  //     {/*        {calculatorSteps?.step2}*/}
  //     {/*      </P>*/}
  //     {/*    </TeaserBoxDesktop>*/}
  //     {/*    <TeaserBoxDesktop>*/}
  //     {/*      <P variant={DESKTOP_VARIANT} className={styles.calculatorSteps}>*/}
  //     {/*        <span className={styles.dash}>&mdash;</span>*/}
  //     {/*        {calculatorSteps?.step1}*/}
  //     {/*      </P>*/}
  //     {/*    </TeaserBoxDesktop>*/}
  //     {/*  </FlexCol>*/}
  //     {/*</Hide>*/}
  //   </FlexRow>
  // );
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
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const router = useRouter();
  const page = router.locale === 'en' ? 'questionnaires' : 'fragenkatalog';
  if (!questionnaireSlug) return null;
  return null;
  // return (
  //   <SectionContainer py={isMobile ? 'md' : 'lg'}>
  //     <TitleWithSubtitleAndDescription
  //       color={{ description: colors.text.light }}
  //       title={title}
  //       description={description}
  //     />
  //     <Flex
  //       justify={isMobile ? 'flex-start' : 'space-between'}
  //       alignItems="flex-start"
  //       mt={MARGIN_TOP}
  //     >
  //       <FlexCol
  //         width={{ base: '100%', lg: '35%' }}
  //         mr={5}
  //         mt={{ base: 4.5, lg: MARGIN_TOP }}
  //       >
  //         <VStack spacing={3} align="flex-start">
  //           {checkmarkTexts?.map((c, index) => (
  //             <TextBoxGroup
  //               key={index}
  //               text={c}
  //               color={{
  //                 tickColor: colors.primary.darkGreen,
  //                 circleBgColor: colors.transparent,
  //               }}
  //               border={CIRCLE_BORDER}
  //             />
  //           ))}
  //         </VStack>
  //         <Box mt={4.5}>
  //           <Link passHref href={`/${page}/${questionnaireSlug}`}>
  //             <Btn
  //               aria-label="Go to questionnaire button"
  //               as="a"
  //               cursor="pointer"
  //               variant="solid"
  //             >
  //               {buttonText}
  //             </Btn>
  //           </Link>
  //         </Box>
  //       </FlexCol>
  //       <Hide below="lg">
  //         <ResultTeaser calculatorSteps={calculatorSteps} />
  //       </Hide>
  //     </Flex>
  //     <Show below="lg">
  //       <ResultTeaser calculatorSteps={calculatorSteps} />
  //     </Show>
  //   </SectionContainer>
  // );
};
