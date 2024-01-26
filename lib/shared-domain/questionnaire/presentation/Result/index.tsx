import React, { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import * as EmailValidator from 'email-validator';

import { getTranslateByScope } from 'translation/i18n';
import { QuestionText } from '../Question/QuestionText';
import { motion } from 'framer-motion';
import { Button } from 'components/Button';
import styles from './Result.module.scss';

import { useValuationStore } from '../../store';
import { FormGroup, Input, Textarea, Checkbox, Message } from 'components/Form';
import { useGetSalesforceScore } from '../../application/useGetQuestionnaireScore';
import { useSalesforceAnswerSync } from '../../application/useSalesforceAnswerSync';
import { useSalesforceLeadSync } from '../../application/useSaleforceLeadSync';
import { qLogs } from '../../application/log';
import { useRouter } from 'next/router';

const t = getTranslateByScope('result');

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
      <InlineWidget url={userCalendlyLink} prefill={prefill} />
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
  resultScreenCopy: any;
}> = ({ onSuccess, score, resultScreenCopy }) => {
  const { syncCurrentAnswersToSalesforce } = useSalesforceAnswerSync();
  const { syncLeadToSalesforce } = useSalesforceLeadSync();
  const [isSubmit, setSubmit] = useState(false);
  const { getAnswer, setAnswer, uniqueId } = useValuationStore();
  const [checkboxIsChecked, setCheckboxIsChecked] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const { locale } = useRouter();

  const SEND_IS_ALLOWED =
    checkboxIsChecked &&
    getAnswer(NAME_STORE_INDICATOR)?.trim() &&
    getAnswer(EMAIL_STORE_INDICATOR)?.trim() &&
    getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
    EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim());

  const formFields = resultScreenCopy.formFields;
  const questionTitle = resultScreenCopy.questionTitle;

  const onSend = async (e) => {
    e.preventDefault();
    setPressed(true);

    if (!SEND_IS_ALLOWED) return;
    await syncCurrentAnswersToSalesforce(
      uniqueId,
      'lastQuestion',
      100,
      'resultScreen',
      'lastQuestion',
    );
    await syncLeadToSalesforce(uniqueId);

    if (!score || !score.avg || score?.avg < 5000000) {
      setSubmit(true);
    } else {
      onSuccess();
    }
  };

  const getEmailError = () => {
    if (!pressed) return null;
    if (!getAnswer(EMAIL_STORE_INDICATOR)?.trim())
      return formFields.emailRequiredError;
    if (!EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim()))
      return formFields.emailInvalidError;

    return null;
  };

  return (
    <AnimateIn>
      {!isSubmit ? (
        <>
          <QuestionText
            title={questionTitle.title}
            description={questionTitle.tooltipDescription}
            toolTipPromptText={questionTitle.tooltipPrompt}
          />

          <form className={styles.resultForm} onSubmit={(e) => onSend(e)}>
            <FormGroup>
              <Input
                id={'resultsFormName'}
                type={'text'}
                required={true}
                label={formFields.nameLabel}
                description={
                  pressed &&
                  !getAnswer(NAME_STORE_INDICATOR)?.trim() &&
                  formFields.nameRequiredError
                }
                value={getAnswer(NAME_STORE_INDICATOR)}
                onChange={(e) => {
                  setAnswer({
                    id: NAME_STORE_INDICATOR,
                    value: e.target.value,
                  });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Input
                id={'resultsFormEmail'}
                type={'email'}
                required={true}
                label={formFields.emailLabel}
                description={getEmailError()}
                value={getAnswer(EMAIL_STORE_INDICATOR)}
                onChange={(e) =>
                  setAnswer({
                    id: EMAIL_STORE_INDICATOR,
                    value: e.target.value,
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <Input
                id={'resultsFormPhone'}
                type={'tel'}
                required={true}
                label={formFields.phoneNumberLabel}
                description={
                  pressed &&
                  !getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
                  formFields.phoneNumberRequiredError
                }
                value={getAnswer(PHONE_NUMBER_STORE_INDICATOR)}
                onChange={(e) =>
                  setAnswer({
                    id: PHONE_NUMBER_STORE_INDICATOR,
                    value: e.target.value,
                  })
                }
              />
            </FormGroup>

            <Checkbox
              onChange={(e) => setCheckboxIsChecked(e.target.checked)}
              isChecked={checkboxIsChecked}
              id="result_checkBox"
            >
              <div
                className={[
                  styles.termsWrapper,
                  locale === 'en' ? styles.enTerms : '',
                ].join(' ')}
              >
                <span>{formFields.checkBoxfirst} </span>
                <a
                  style={{
                    display: 'inline-block',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                  target="_blank"
                  rel="noreferrer"
                  href={formFields.checkBoxLink}
                >
                  {formFields.checkBoxSecond}
                </a>
                <span> {formFields.checkBoxThird}</span>
              </div>
            </Checkbox>
            {pressed && !checkboxIsChecked && (
              <FormGroup>
                <Message isError> {t('evaluation.form.checkboxError')}</Message>
              </FormGroup>
            )}
            <div className={styles.formFooter}>
              <Button
                type="submit"
                variant="primary"
                disabled={!checkboxIsChecked}
                onDark
                hideIcon
                classes={styles.submitButton}
              >
                {formFields.buttonText}
              </Button>
              <div
                className="trustedsite-trustmark"
                data-type="211"
                data-width="180"
                data-height="75"
              ></div>
            </div>
          </form>
        </>
      ) : (
        <h3 className={styles.successMessage}>{formFields.successMessage}</h3>
      )}
    </AnimateIn>
  );
};

export const Result: React.FC<{ questionnaire: any }> = (questionnaire) => {
  const resultScreenCopy = questionnaire.questionnaire.resultScreenCopy;
  const [showAppointmentBooking, setShowAppointmentBooking] =
    React.useState(false);
  const [score, setScore] = React.useState<{
    points: string;
    percentage: string;
    calendly: string;
    avg: number;
  }>(null);
  const [hasError, setHasError] = React.useState(false);
  const { getScore } = useGetSalesforceScore();
  const calendlyFallback = process.env.NEXT_PUBLIC_CALCULATOR_CALENDLY_FALLBACK;

  React.useEffect(() => {
    const loadScore = async () => {
      try {
        qLogs('Score: loading score');
        const score = await getScore();
        qLogs(
          'Score: calculate - showing screen to book an appointment' + score,
        );
        setScore(score);

        const status = score + 'status';
        status.includes('Error') ? setHasError(true) : setHasError(false);
      } catch (e) {
        qLogs('Score: something went wrong');
        setHasError(true);
      }
    };
    loadScore();
  }, []);

  if (hasError) {
    return <QuestionText title={t('loading.error')} />;
  }

  return (
    <>
      {!showAppointmentBooking ? (
        <EvaluationScreen
          score={score}
          onSuccess={() => setShowAppointmentBooking(true)}
          resultScreenCopy={resultScreenCopy}
        />
      ) : (
        <AppointmentBookingScreen
          userCalendlyLink={score.calendly ? score.calendly : calendlyFallback}
        />
      )}
    </>
  );
};
