import { getTranslateByScope } from 'translation/i18n';
import { useValuationStore } from '../../store';

import React, { useLayoutEffect, useState } from 'react';
import useBreakpoint from 'lib/utils/useBreakpoints';

const Header = ({ siteSettings }): JSX.Element => {
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

  const breakpoints = useBreakpoint();
  const isMobile = breakpoints === 'sm';

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
  }, [mainStep, questionnaire?.questionsByCategory, subStep]);

  const [logo, setLogo] = useState(siteSettings?.darkLogo?.asset?.url);

  useLayoutEffect(() => {
    if (isMobile) setLogo(siteSettings?.darkLogoMobile?.asset?.url);
    else setLogo(siteSettings?.darkLogo?.asset?.url);
  }, [isMobile]);
  const progress = (currenQuestionPosition / numberOfQuestionsInTotal) * 100;

  return <div>Header</div>;
};

export default Header;
