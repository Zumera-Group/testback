import React, { useState } from 'react';

import { getTranslateByScope } from 'translation/i18n';
import { TaxCalculatorQuestionnaire } from 'lib/shared-domain/tax-calculator/types';
import { QuestionText } from 'lib/shared-domain/questionnaire/presentation/Question/QuestionText';
import { useRouter } from 'next/router';
import {
  EMAIL_STORE_INDICATOR,
  NAME_STORE_INDICATOR,
  PHONE_NUMBER_STORE_INDICATOR,
} from 'lib/shared-domain/questionnaire/presentation/Result/constants';
import * as EmailValidator from 'email-validator';
import { AnimateIn } from 'lib/shared-domain/questionnaire/presentation/Result/components/AnimateIn';
import styles from 'lib/shared-domain/questionnaire/presentation/Result/Result.module.scss';
import { Checkbox, FormGroup, Input, Message } from 'components/Form';
import { Button } from 'components/Button';
import { useTaxSalesforceQueries } from 'lib/shared-domain/tax-calculator/hooks/useTaxSalesforceQueries';
import { useTaxCalculatorStore } from 'lib/shared-domain/tax-calculator/store';

const t = getTranslateByScope('result');

interface ResultsScreenFormProps {
  resultScreenCopy: TaxCalculatorQuestionnaire['resultScreenCopy']
}

export const ResultScreen: React.FC<ResultsScreenFormProps> = ({ resultScreenCopy }) => {
  const { syncTaxCurrentAnswersToSalesforce } = useTaxSalesforceQueries();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { getTaxAnswer, setTaxAnswer, uniqueId } = useTaxCalculatorStore();
  const [checkboxIsChecked, setCheckboxIsChecked] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const { locale } = useRouter();

  const isSubmissionAllowed =
    checkboxIsChecked &&
    getTaxAnswer(NAME_STORE_INDICATOR)?.trim() &&
    getTaxAnswer(EMAIL_STORE_INDICATOR)?.trim() &&
    getTaxAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
    EmailValidator.validate(getTaxAnswer(EMAIL_STORE_INDICATOR)?.trim());

  const formFields = resultScreenCopy.formFields;
  const questionTitle = resultScreenCopy.questionTitle;

  const onSend = async (e) => {
    e.preventDefault();
    setPressed(true);

    if (!isSubmissionAllowed) {
      return;
    }
    await syncTaxCurrentAnswersToSalesforce({
      uniqueId,
      currentSalesforceId: 'lastQuestion',
      currentField: 'resultScreen',
      currentQuestionNumber: '100%',
    });

    setIsFormSubmitted(true);
  };

  const getEmailError = () => {
    if (!pressed) return null;
    if (!getTaxAnswer(EMAIL_STORE_INDICATOR)?.trim())
      return formFields.emailRequiredError;
    if (!EmailValidator.validate(getTaxAnswer(EMAIL_STORE_INDICATOR)?.trim()))
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
                  !getTaxAnswer(NAME_STORE_INDICATOR)?.trim() &&
                  formFields.nameRequiredError
                }
                value={getTaxAnswer(NAME_STORE_INDICATOR)}
                onChange={(e) => {
                  setTaxAnswer({
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
                value={getTaxAnswer(EMAIL_STORE_INDICATOR)}
                onChange={(e) =>
                  setTaxAnswer({
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
                  !getTaxAnswer(PHONE_NUMBER_STORE_INDICATOR)?.trim() &&
                  formFields.phoneNumberRequiredError
                }
                value={getTaxAnswer(PHONE_NUMBER_STORE_INDICATOR)}
                onChange={(e) =>
                  setTaxAnswer({
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
