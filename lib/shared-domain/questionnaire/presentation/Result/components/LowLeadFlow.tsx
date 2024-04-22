import React, { useState, useCallback } from 'react';
import { AnimateIn } from 'lib/shared-domain/questionnaire/presentation/Result/components/AnimateIn';
import { getTranslateByScope } from 'translation/i18n';
import { useRouter } from 'next/router';
import * as EmailValidator from 'email-validator';
import { QuestionText } from '../../Question/QuestionText';
import { Button } from 'components/Button';
import styles from '../Result.module.scss';

import { useValuationStore } from '../../../store';
import { Checkbox, FormGroup, Input, Message } from 'components/Form';
import { useSalesforceAnswerSync } from '../../../application/useSalesforceAnswerSync';
import { useSalesforceLeadSync } from '../../../application/useSaleforceLeadSync';
import {
  EMAIL_STORE_INDICATOR,
  NAME_STORE_INDICATOR,
  PHONE_NUMBER_STORE_INDICATOR,
} from 'lib/shared-domain/questionnaire/presentation/Result/constants';


const t = getTranslateByScope('result');
const tForm = getTranslateByScope('form');

export const LowLeadFlow: React.FC<{
  score: { points: string; percentage: string; avg: number };
  resultScreenCopy: any;
}> = ({ score, resultScreenCopy }) => {
  const { syncCurrentAnswersToSalesforce } = useSalesforceAnswerSync();
  const { syncLeadToSalesforce } = useSalesforceLeadSync();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { getAnswer, setAnswer, uniqueId, addBgPromise } = useValuationStore();
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { locale } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const SEND_IS_ALLOWED =
    checkboxIsChecked &&
    getAnswer(NAME_STORE_INDICATOR)?.trim() &&
    getAnswer(EMAIL_STORE_INDICATOR)?.trim() &&
    getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
    EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim());

  const formFields = resultScreenCopy.formFields;
  const questionTitle = resultScreenCopy.questionTitle;

  const submitData = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await syncCurrentAnswersToSalesforce(
        uniqueId,
        'lastQuestion',
        100,
        'resultScreen',
        'lastQuestion',
      );
      await syncLeadToSalesforce(uniqueId);
      setIsFormSubmitted(true);
    } catch (e) {
      console.error('Error on form submission:', e);
    }
    setIsSubmitting(false);
  }, [setIsSubmitting, syncCurrentAnswersToSalesforce, syncLeadToSalesforce, setIsFormSubmitted]);

  const onSend = useCallback((e) => {
    e.preventDefault();
    setPressed(true);

    if (!SEND_IS_ALLOWED) {
      return;
    }

    const promise = submitData();
    addBgPromise(promise);
  }, [submitData, setPressed, SEND_IS_ALLOWED]);

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
      {!isFormSubmitted ? (
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
                disabled={!checkboxIsChecked || isSubmitting}
                onDark
                hideIcon
                classes={styles.submitButton}
              >
                {isSubmitting ? tForm('loading') : formFields.buttonText}
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

