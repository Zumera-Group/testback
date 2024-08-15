import React, { useCallback, useState } from 'react';
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
  COMPANY_NAME_STORE_INDICATOR,
  EMAIL_STORE_INDICATOR,
  NAME_STORE_INDICATOR, NEWSLETTER_CHECKBOX,
  PHONE_NUMBER_STORE_INDICATOR,
} from 'lib/shared-domain/questionnaire/presentation/Result/constants';
import {useMediaQuery} from '../../../../../hooks/useMediaQuery';
import {SCREEN_SIZE_MD} from '../../../../../constants';


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
  const [isPolicyCheckboxChecked, setIsPolicyCheckboxChecked] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { locale } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formFields = resultScreenCopy.formFields;
  const isMobile = useMediaQuery(`(max-width: ${SCREEN_SIZE_MD})`);

  const isSubmissionAllowed =
    isPolicyCheckboxChecked &&
    (!!formFields.isNewsLetterCheckboxRequired ? getAnswer(NEWSLETTER_CHECKBOX) : true) &&
    !!getAnswer(NAME_STORE_INDICATOR)?.trim() &&
    !!getAnswer(EMAIL_STORE_INDICATOR)?.trim() &&
    (!!formFields.isCompanyFieldRequired ? !!getAnswer(COMPANY_NAME_STORE_INDICATOR)?.trim() : true) &&
    (!!formFields.isPhoneNumberFieldRequired ? !!getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() : true) &&
    EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim());

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
  }, [uniqueId, setIsSubmitting, syncCurrentAnswersToSalesforce, syncLeadToSalesforce, setIsFormSubmitted]);

  const onSend = useCallback((e) => {
    e.preventDefault();
    setPressed(true);

    if (!isSubmissionAllowed) {
      return;
    }

    const promise = submitData();
    // addBgPromise(promise);
  }, [submitData, setPressed, isSubmissionAllowed]);

  const successMessageRef = useCallback((node) => {
    if (node) {
      let top = 0;
      if (isMobile) {
        top = node.getBoundingClientRect().top + window.scrollY - 30;
        if (top < 0) {
          top = 0;
        }
      }

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  }, [isMobile]);

  const getEmailError = () => {
    if (!pressed) return null;
    if (!getAnswer(EMAIL_STORE_INDICATOR)?.trim())
      return formFields.emailRequiredError;
    if (!EmailValidator.validate(getAnswer(EMAIL_STORE_INDICATOR)?.trim()))
      return formFields.emailInvalidError;

    return null;
  };

  const getCompanyError = () => {
    if (!pressed) return null;
    if (!formFields.isCompanyFieldRequired) return null;
    if (!getAnswer(COMPANY_NAME_STORE_INDICATOR)?.trim())
      return formFields.companyRequiredError;

    return null;
  };

  const getPhoneNumberError = () => {
    if (!pressed) return null;
    if (!formFields.isPhoneNumberFieldRequired) return null;
    if (!getAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim())
      return formFields.phoneNumberRequiredError;

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

            {
              formFields.companyLabel && formFields.companyRequiredError &&
                <FormGroup>
                  <Input
                    id={'resultsFormCompanyName'}
                    type={'text'}
                    required={!!formFields.isCompanyFieldRequired}
                    label={formFields.companyLabel}
                    description={getCompanyError()}
                    value={getAnswer(COMPANY_NAME_STORE_INDICATOR)}
                    onChange={(e) =>
                      setAnswer({
                        id: COMPANY_NAME_STORE_INDICATOR,
                        value: e.target.value,
                      })
                    }
                  />
                </FormGroup>
            }

            <FormGroup>
              <Input
                id={'resultsFormPhone'}
                type={'tel'}
                required={!!formFields.isPhoneNumberFieldRequired}
                label={formFields.phoneNumberLabel}
                description={getPhoneNumberError()}
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
              onChange={(e) => setIsPolicyCheckboxChecked(e.target.checked)}
              isChecked={isPolicyCheckboxChecked}
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

            {
              !!formFields.newsLetterCheckboxText &&
              <div style={{ marginTop: '12px' }}>
                <FormGroup>
                  <Checkbox
                    id={'newsLetterCheckbox'}
                    required={!!formFields.isNewsLetterCheckboxRequired}
                    isChecked={getAnswer(NEWSLETTER_CHECKBOX)}
                    onChange={(e) => {
                      setAnswer({
                        id: NEWSLETTER_CHECKBOX,
                        value: e.target.checked,
                      });
                    }}
                  >
                    {formFields.newsLetterCheckboxText}
                  </Checkbox>
                </FormGroup>
              </div>
            }

            {pressed && !isPolicyCheckboxChecked && (
              <FormGroup>
                <Message isError> {t('evaluation.form.checkboxError')}</Message>
              </FormGroup>
            )}
            <div className={styles.formFooter}>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !isSubmissionAllowed}
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
        <h3 id="result-message" className={styles.successMessage} ref={successMessageRef}>{formFields.successMessage}</h3>
      )}
    </AnimateIn>
  );
};

