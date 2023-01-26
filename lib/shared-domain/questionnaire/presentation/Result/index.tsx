import React from 'react';
import { InlineWidget } from 'react-calendly';
import * as EmailValidator from 'email-validator';

import {
  Flex,
  FormControl,
  FormErrorMessage,
  GridItem,
  Progress,
} from '@chakra-ui/react';
import Image from 'next/image';
import firstLogoRowImage from '../../../../../public/logos_1.png';
import secondLogoRowImage from '../../../../../public/logos_2.png';
import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { getTranslateByScope } from 'translation/i18n';
import { QuestionText } from '../Question/QuestionText';
import { motion } from 'framer-motion';
import { Button } from 'components/Button';
import styles from './Result.module.scss';
import {
  fontSizes,
  fontWeights,
} from '../../../../../styles/foundations/fontStyles';
import { useValuationStore } from '../../store';
import { InputWithLabelAndError } from 'components/Inputs';
import { Checkbox } from 'components/Form/Checkbox/';
import { useGetSalesforceScore } from '../../application/useGetQuestionnaireScore';
import { useSalesforceAnswerSync } from '../../application/useSalesforceAnswerSync';
import { qLogs } from '../../application/log';
import Lottie from 'react-lottie';
import * as animationData from './loading.json';
import { useRouter } from 'next/router';
import { Beam } from 'components/Beam';

const t = getTranslateByScope('result');

const MT = { base: 5, lg: 5 };

const PROGRESS_WHITE_OVERLAY_STYLE = {
  content: '""" "',
  position: 'absolute',
  top: 0,
  width: '63px',
  height: '20px',
  borderTop: '15px solid',
  borderColor: colors.white,
};

const PROGRESS_BAR_STYLE = {
  width: '230px',
  height: '32px',
  colorScheme: 'primary',
  background: colors.gray[400],
  isAnimated: true,
};

const ProgressX: React.FC<{ loadingPercentage: number }> = ({
  loadingPercentage,
}) => {
  return (
    <FlexRow
      mt={MT}
      flex={1}
      left="20%"
      bottom="100px"
      position="relative"
      _after={{
        content: '""" "',
        position: 'absolute',
        top: '220%',
        left: '125px',
        width: '57px',
        height: '20px',
        transform: 'rotate(240deg)',
        borderTop: '15px solid',
        borderColor: colors.white,
      }}
    >
      <Progress
        {...PROGRESS_BAR_STYLE}
        _after={{
          ...PROGRESS_WHITE_OVERLAY_STYLE,
          left: '-32px',
          transform: 'rotate(240deg)',
        }}
        _before={{
          ...PROGRESS_WHITE_OVERLAY_STYLE,
          right: '-32px',
          transform: 'rotate(240deg)',
        }}
        value={loadingPercentage}
        transform="rotate(-60deg) translateX(-30%) translateY(200%)"
      />
      <Progress
        {...PROGRESS_BAR_STYLE}
        _after={{
          ...PROGRESS_WHITE_OVERLAY_STYLE,
          left: '-32px',
          transform: 'rotate(-240deg)',
        }}
        _before={{
          ...PROGRESS_WHITE_OVERLAY_STYLE,
          right: '-32px',
          transform: 'rotate(-240deg)',
        }}
        value={loadingPercentage}
        transform="rotate(240deg) translateX(10%) translateY(-700%)"
      />
    </FlexRow>
  );
};

const LoadingText: React.FC<{ isLoading: boolean; title: string }> = ({
  isLoading,
  title,
}) => {
  return (
    <p className={isLoading ? styles.loadingText__active : styles.loadingText}>
      {title}
    </p>
  );
};

const animationVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
};

const AnimateIn: React.FC = ({ children }) => {
  return (
    <motion.div
      style={{ height: '100%' }}
      transition={{ delay: 0.2, duration: 0.4 }}
      initial="initial"
      animate="in"
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};

const SALESFORCE_NO_CALENDLY_LINK_IDENTIFIER = 'unqualified';

const AppointmentBookingScreen: React.FC<{ userCalendlyLink?: string }> = ({
  userCalendlyLink,
}) => {
  const { getAnswer } = useValuationStore();
  const name = getAnswer(NAME_STORE_INDICATOR)?.trim();
  const email = getAnswer(EMAIL_STORE_INDICATOR)?.trim();
  const phone = getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim();

  const prefill = {
    email,
    name,
    customAnswers: {
      a1: `${t('appointment.calendlyCustomAnswers.a1')} ${phone}`,
    },
  };

  return (
    <AnimateIn>
      <QuestionText title={t('appointment.title')} />
      <InlineWidget
        // url={
        //   !userCalendlyLink ||
        //   userCalendlyLink === SALESFORCE_NO_CALENDLY_LINK_IDENTIFIER
        //     ? process.env.NEXT_PUBLIC_CALENDLY_LINK
        //     : userCalendlyLink
        // }
        url={process.env.NEXT_PUBLIC_CALENDLY_LINK}
        prefill={prefill}
      />
    </AnimateIn>
  );
};

// This indicates the field names in Salesforce
export const NAME_STORE_INDICATOR = 'LastName';
const EMAIL_STORE_INDICATOR = 'email';
const PHONE_NUMBER_STORE_INDICATOR = 'phone';

const EvaluationScreen: React.FC<{
  onSuccess: () => void;
  score: { points: string; percentage: string; avg: number };
}> = ({ onSuccess, score }) => {
  const { syncCurrentAnswersToSalesforce } = useSalesforceAnswerSync();
  const { locale, push } = useRouter();

  const { getAnswer, setAnswer, uniqueId } = useValuationStore();
  const [checkboxIsChecked, setCheckboxIsChecked] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const SEND_IS_ALLOWED =
    checkboxIsChecked &&
    getAnswer(NAME_STORE_INDICATOR)?.trim() &&
    getAnswer(EMAIL_STORE_INDICATOR)?.trim() &&
    getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
    EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim());

  const onSend = async () => {
    setPressed(true);
    if (!SEND_IS_ALLOWED) return;
    await syncCurrentAnswersToSalesforce(uniqueId, 'lastQuestion');

    if (!score || !score.avg || score?.avg < 5000000) {
      if (locale === 'de') {
        push('https://www.saxenhammer-co.com/de');
      } else {
        push('https://www.saxenhammer-co.com/');
      }
    } else {
      onSuccess();
    }
  };

  const getEmailError = () => {
    if (!pressed) return null;
    if (!getAnswer(EMAIL_STORE_INDICATOR)?.trim())
      return t('evaluation.form.email.requiredError');
    if (!EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim()))
      return t('evaluation.form.email.invalidError');

    return null;
  };

  const Presenter = {
    hasPoints: () => {
      if (score.points === '#N/A' || !score.points) return false;
      return true;
    },

    getFormattedPoints: () => {
      return score.points;
    },

    getPercentage: () => {
      try {
        return Math.floor(Number(score.percentage) * 100);
      } catch (e) {
        return '';
      }
    },
  };

  const hasScoreAndPercentage =
    Presenter.hasPoints() && Presenter.getPercentage();

  return (
    <AnimateIn>
      <QuestionText
        title={t('evaluation.title')}
        description={t('evaluation.description')}
      />

      <FlexCol maxWidth={700}>
        <Flex direction={{ base: 'column', lg: 'row' }} flexWrap="wrap">
          <FlexCol
            ml={{ base: 0, lg: hasScoreAndPercentage ? 4 : 'auto' }}
            flex={{ base: 1, lg: 0.6 }}
            mr={!hasScoreAndPercentage && 'auto'}
          >
            <InputWithLabelAndError
              error={
                pressed &&
                !getAnswer(NAME_STORE_INDICATOR)?.trim() &&
                t('evaluation.form.name.error')
              }
              label={t('evaluation.form.name.label')}
              placeholder={t('evaluation.form.name.placeholder')}
              value={getAnswer(NAME_STORE_INDICATOR)}
              onChange={(value) =>
                setAnswer({ id: NAME_STORE_INDICATOR, value })
              }
              isRequired
            />

            <InputWithLabelAndError
              error={getEmailError()}
              label={t('evaluation.form.email.label')}
              placeholder={t('evaluation.form.email.placeholder')}
              value={getAnswer(EMAIL_STORE_INDICATOR)}
              onChange={(value) =>
                setAnswer({ id: EMAIL_STORE_INDICATOR, value })
              }
              isRequired
            />
            <InputWithLabelAndError
              error={
                pressed &&
                !getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
                t('evaluation.form.phoneNumber.error')
              }
              label={t('evaluation.form.phoneNumber.label')}
              placeholder={t('evaluation.form.phoneNumber.placeholder')}
              value={getAnswer(PHONE_NUMBER_STORE_INDICATOR)}
              onChange={(value) =>
                setAnswer({ id: PHONE_NUMBER_STORE_INDICATOR, value })
              }
              isRequired
            />

            <FormControl isInvalid={pressed && !checkboxIsChecked}>
              <Checkbox
                onChange={(e) => setCheckboxIsChecked(e.target.checked)}
                isChecked={checkboxIsChecked}
                id="result_checkBox"
              >
                <Box color="white" textAlign="left" mt={-0.5}>
                  <span>{t('evaluation.form.checkbox.first')}</span>
                  <a
                    style={{
                      display: 'inline-block',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                    target="_blank"
                    rel="noreferrer"
                    href={t('evaluation.form.checkbox.link')}
                  >
                    {t('evaluation.form.checkbox.second')}
                  </a>
                  <span>{t('evaluation.form.checkbox.third')}</span>
                </Box>
              </Checkbox>
              {pressed && !checkboxIsChecked && (
                <FormErrorMessage mt={20} mb={20} color={'white'}>
                  {t('evaluation.form.checkboxError')}
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="primary"
              callBack={onSend}
              disabled={!checkboxIsChecked}
              onDark
              hideIcon
              classes={styles.submitButton}
            >
              {t('evaluation.form.button')}
            </Button>
          </FlexCol>
        </Flex>
      </FlexCol>
    </AnimateIn>
  );
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export const Result: React.FC = () => {
  const [showAppointmentBooking, setShowAppointmentBooking] =
    React.useState(false);
  const [loadingPercentage, setLoadingPercentage] = React.useState(0);
  const [score, setScore] = React.useState<{
    points: string;
    percentage: string;
    calendly: string;
    avg: number;
  }>(null);
  const [hasError, setHasError] = React.useState(false);
  const { getScore } = useGetSalesforceScore();

  React.useEffect(() => {
    const loadScore = async () => {
      try {
        qLogs('Score: loading score');
        const score = await getScore();
        qLogs(
          'Score: calculate - showing screen to book an appointment' + score,
        );
        setScore(score);
        setHasError(false);
      } catch (e) {
        qLogs('Score: something went wrong');
        setHasError(true);
      }
    };
    loadScore();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (loadingPercentage < 100) {
        setLoadingPercentage(loadingPercentage + 1);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [loadingPercentage]);

  if (score && loadingPercentage >= 100)
    return (
      <>
        {!showAppointmentBooking ? (
          <EvaluationScreen
            score={score}
            onSuccess={() => setShowAppointmentBooking(true)}
          />
        ) : (
          <AppointmentBookingScreen userCalendlyLink={score.calendly} />
        )}
      </>
    );

  return (
    //loading screen
    <AnimateIn>
      {!hasError ? (
        <QuestionText title={t('loading.title')} />
      ) : (
        <QuestionText title={t('loading.error')} />
      )}
    </AnimateIn>
  );
};
