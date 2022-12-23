import {
  Box,
  useDisclosure,
  Progress,
  GridItem,
  Image,
  Grid,
} from '@chakra-ui/react';
import { icons } from 'components/Icons';
import { FlexRow } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../../store';
import { Modals } from '../Modal';
import { colors } from '../../../../../styles/foundations/colors';
import { ChatButton } from 'components/ChatButton';
import { fontWeights, fontSizes } from 'styles/foundations/fontStyles';
import React, { useLayoutEffect, useState } from 'react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

const Header = ({ siteSettings }): JSX.Element => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const t = getTranslateByScope('header');
  const {
    mainStep,
    subStep,
    setStep,
    questionnaire,
    isFirstQuestion,
    isOnResultScreen,
    setIsOnResultScreen,
  } = useValuationStore();
  const currentCategory = questionnaire?.questionsByCategory?.[mainStep];
  const categoryQuestions = questionnaire && currentCategory?.questions;

  const onPreviousQuestion = () => {
    if (isOnResultScreen) {
      setIsOnResultScreen(false);
      return;
    }
    const hasPrevQuestion = categoryQuestions[subStep - 1];
    const hasPrevCategory = questionnaire?.questionsByCategory?.[mainStep - 1];

    if (hasPrevQuestion) {
      return setStep(mainStep, subStep - 1);
    } else if (hasPrevCategory) {
      const prevCategoryQuestions = hasPrevCategory?.questions;
      return setStep(mainStep - 1, prevCategoryQuestions?.length - 1);
    } else {
      return setStep(0, 0);
    }
  };

  const quitDisclosure = useDisclosure();

  const numberOfQuestionsInTotal = questionnaire?.questionsByCategory?.reduce(
    (numberOfQuestions, currentCategory) => {
      return numberOfQuestions + currentCategory.questions.length;
    },
    0,
  );

  const [currenQuestionPosition, setCurrentQuestionPosition] =
    React.useState(0);

  React.useEffect(() => {
    const stepInCurrentCategory = subStep + 1;
    let numberOfStepsInOtherCategories = 0;

    for (let i = 0; i < mainStep; i++) {
      numberOfStepsInOtherCategories =
        numberOfStepsInOtherCategories +
        questionnaire?.questionsByCategory?.[i]?.questions?.length;
    }
    setCurrentQuestionPosition(
      stepInCurrentCategory + numberOfStepsInOtherCategories,
    );
  }, [subStep]);

  const [logo, setLogo] = useState(siteSettings?.darkLogo?.asset?.url);

  useLayoutEffect(() => {
    if (isMobile) setLogo(siteSettings?.darkLogoMobile?.asset?.url);
    else setLogo(siteSettings?.darkLogo?.asset?.url);
  }, [isMobile]);

  const HeaderRightItems = () => {
    return (
      <FlexRow justifyContent="flex-end" alignItems="center" alignSelf="center">
        {isMobile ? (
          <Box pr={2}>
            <ChatButton />
          </Box>
        ) : (
          <Box pr={2} as="button" onClick={quitDisclosure.onOpen}>
            <P>{t('SaveForLater')}</P>
          </Box>
        )}

        <P color={colors.gray[500]} opacity={0.5}>
          |
        </P>

        <Box pl={2} as="button" onClick={quitDisclosure.onOpen}>
          <icons.Close />
        </Box>
      </FlexRow>
    );
  };

  const HeaderCenterItems = () => {
    return (
      <FlexRow justifyContent="center" alignItems="center" alignSelf="center">
        {isMobile ? (
          <P
            fontSize={fontSizes.small}
            color={colors.text.lightest}
            fontWeight={fontWeights.semiBold}
            mr={2}
          >
            {t('mobileTitle', {
              current: mainStep + 1,
              max: questionnaire?.questionsByCategory?.length,
            })}
          </P>
        ) : (
          <Grid templateColumns="1fr" width="100%">
            <GridItem>
              <P
                mb={2}
                fontWeight={fontWeights.semiBold}
                color={colors.primary.darkGreen}
              >
                {currentCategory?.categoryName}
              </P>
            </GridItem>

            <GridItem>
              <Progress
                isAnimated
                background={colors.mobileProgressBarBg}
                colorScheme="primary"
                width="100%"
                height={1}
                value={
                  (currenQuestionPosition / numberOfQuestionsInTotal) * 100
                }
              />
            </GridItem>
          </Grid>
        )}
      </FlexRow>
    );
  };

  return (
    <>
      <Modals.Quit {...quitDisclosure} />
      <Grid
        templateColumns="0.9fr 1.2fr 0.9fr"
        gap={{ base: 0, lg: 3 }}
        alignItems="center"
      >
        <GridItem textAlign="center">
          {logo && <Image width="182px" height="21px" src={logo} alt="logo" />}
        </GridItem>
        {!isOnResultScreen && (
          <>
            <GridItem textAlign="center">
              <HeaderCenterItems />
            </GridItem>
            {/* <GridItem textAlign="right">
              <HeaderRightItems />
            </GridItem> */}
          </>
        )}
      </Grid>

      {isMobile && !isOnResultScreen && (
        <Grid
          mt={1}
          templateColumns="1fr"
          width="100%"
          display={{ base: 'grid', lg: 'none' }}
          textAlign="center"
        >
          <GridItem>
            <P
              mb={2}
              fontWeight={fontWeights.semiBold}
              color={colors.primary.darkGreen}
            >
              {currentCategory?.categoryName}
            </P>
          </GridItem>

          <GridItem>
            <Progress
              isAnimated
              background={colors.mobileProgressBarBg}
              colorScheme="primary"
              width="100%"
              height={1}
              value={(currenQuestionPosition / numberOfQuestionsInTotal) * 100}
            />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Header;
