import React from 'react';
import { getTranslateByScope } from 'translation/i18n';
import { Flex, Square } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { FlexCol, Box, FlexRow } from '../../../../components/Layout/Flex/Flex';
import headerBkg from '../../../../public/VTLanding/headerBkg.png';
import { HEADER_HEIGHT } from '../../page/constants';
import { VTLanding } from '../domain/index';
import { Btn } from '../../../../components/Buttons/Button/index';
import Link from 'next/link';
import { LinkWithArrow } from '../../page/presentation/components/LinkWithArrow';
import { colors } from '../../../../styles/foundations/colors';
import { questions } from '../../questionnaire/presentation/questions/index';
import { H } from '../../../../components/Typography/H';
import {
  fontSizes,
  fontWeights,
} from '../../../../styles/foundations/fontStyles';
import { borders } from 'styles/foundations/borderStyles';
import { P } from '../../../../components/Typography/P';
import { Question } from '../../questionnaire/domain/index';
import { useHover } from '../../../hooks/useOnHover';
import { links } from 'lib/links';

const t = getTranslateByScope('VTLanding');
const questionText = t('questionText');
const questionSubtitle = t('questionSubtitle');
const boxesToRender = [
  {
    _key: '1',
    boxContent: t('boxContent.1'),
  },
  {
    _key: '2',
    boxContent: t('boxContent.2'),
  },
  {
    _key: '3',
    boxContent: t('boxContent.3'),
  },
];

const SIZE = 120;

const QuestionTeaserItem: React.FC<{ urlToTool: string; text: string }> = ({
  urlToTool,
  text,
}) => {
  const [ref, isHover] = useHover();
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;

  const fontWeight = isHover ? fontWeights.highlight : fontWeights.regular;
  const color = isHover ? colors.white : colors.white;

  return (
    <Box ref={ref}>
      <Link passHref href={urlToTool}>
        {!isMobile ? (
          <Square
            background={colors.primary.darkGreen}
            size={SIZE}
            flexDirection="column"
            justifyContent="space-evenly"
            cursor="pointer"
            as="a"
            mx={1.5}
            mb={3}
            p={0.5}
          >
            <Box textAlign="center">
              <P
                style={{
                  hyphens: 'auto',
                }}
                variant="p"
                fontWeight={fontWeight}
                fontSize={fontSizes.tiny}
                color={color}
              >
                {text}
              </P>
            </Box>
          </Square>
        ) : (
          <Flex
            background={colors.primary.darkGreen}
            cursor="pointer"
            justify="space-between"
            p={1}
            w="95%"
            mb={2}
          >
            <Flex wrap="wrap">
              <P
                fontWeight={fontWeight}
                variant="circleSelectorItemP"
                color={color}
              >
                {text}
              </P>
            </Flex>
          </Flex>
        )}
      </Link>
    </Box>
  );
};

const QuestionTeaser: React.FC<{ urlToTool: string; question: Question }> = ({
  urlToTool,
  question,
}) => {
  const BOX_SHADOW = '0px 20px 40px rgba(12, 78, 64, 0.35)';
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  // const isColumn = useBreakpointValue({ base: true, md: false });
  const isMobile = false;
  const isColumn = false;
  const FlexRowOrColumnWrapper = isColumn ? FlexCol : FlexRow;

  const renderQuestion = () => {
    const answerType = question?.answerSelector?.answerType;
    if (answerType === 'boxSelector') {
      return <questions.BoxSelector question={question} />;
    } else {
      // @ts-ignore
      if (answerType === 'slider') {
        // return <questions.Slider question={question} />;
      } else if (answerType === 'textInput') {
        // return <questions.TextInput question={question} />;
      } else if (answerType === 'orbitSelector') {
        // return <questions.OrbitSelector question={question} />;
      } else if (answerType === 'multiTextInput') {
        // return <questions.MultiTextInput question={question} />;
      }
    }
    return null;
  };

  return (
    <FlexCol
      boxShadow={BOX_SHADOW}
      px={isMobile ? 2 : 5}
      py={isMobile ? 5 : 7}
      w={isMobile ? '100%' : '100%'}
      mt={isMobile ? 5 : 0}
      justify={isMobile ? 'center' : 'flex-start'}
      bg={colors.white}
      h="fit-content"
    >
      <Box mt={2} maxWidth={700} mx="auto" pb={4}>
        <H
          as="h1"
          textAlign="center"
          variant="h1"
          fontSize="33px"
          lineHeight="40.5px"
          maxWidth="398px"
          fontStyle="normal"
          fontWeight="400"
        >
          {questionText}
        </H>
        <P textAlign="center" color={colors.text.light} mt={3}>
          {questionSubtitle}
        </P>
      </Box>
      <FlexRowOrColumnWrapper justify={isColumn ? '' : 'center'}>
        {boxesToRender.map((b) => (
          <QuestionTeaserItem
            key={b._key}
            urlToTool={urlToTool}
            text={b.boxContent}
          />
        ))}
      </FlexRowOrColumnWrapper>
    </FlexCol>
  );
};

export const VTLandingHero: React.FC<{ landing: VTLanding }> = ({
  landing,
}) => {
  // const isMobile = useBreakpointValue({ base: true, lg: false });
  const isMobile = false;
  const urlToTool = links().questionnaires(landing?.questionnaire as any);

  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      backgroundImage={`url(${headerBkg.src})`}
      backgroundPosition={isMobile ? 'right' : 'center'}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
    >
      <SectionContainer pb={isMobile ? 'sm' : 'xl'} pt={isMobile ? 'sm' : 'md'}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify={isMobile ? 'flex-start' : 'space-between'}
          mt="110px"
        >
          <Box w={{ base: '100%', lg: '40%' }} mr={6} mt="-1em">
            <TitleWithSubtitleAndDescription
              title={landing?.landingName}
              description={landing?.description}
            />
            <Flex direction={{ base: 'column', sm: 'row' }} my={4}>
              <Box mb={3} mr={3}>
                <Btn
                  aria-label="Go to tool button"
                  variant="solid"
                  paddingX={4}
                >
                  <Link passHref href={urlToTool}>
                    {landing?.buttonText}
                  </Link>
                </Btn>
              </Box>
              {landing?.secondButtonText && (
                <Box minW="220px" mt="5px">
                  {landing?.fileToDownload ? (
                    <LinkWithArrow
                      title={landing?.secondButtonText}
                      href={`${landing?.fileToDownload?.asset?.url}?dl=`}
                    />
                  ) : (
                    <LinkWithArrow
                      title={landing?.secondButtonText}
                      href={urlToTool}
                    />
                  )}
                </Box>
              )}
            </Flex>
          </Box>
          <QuestionTeaser urlToTool={urlToTool} question={landing.question} />
        </Flex>
      </SectionContainer>
    </FlexCol>
  );
};
