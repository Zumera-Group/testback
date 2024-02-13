import React from 'react';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import { useSalesforceAnswerSync } from 'lib/shared-domain/questionnaire/application/useSalesforceAnswerSync';
import { useSalesforceLeadSync } from 'lib/shared-domain/questionnaire/application/useSaleforceLeadSync';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import { QuestionText } from 'lib/shared-domain/questionnaire/presentation/Question/QuestionText';
import { AnimateIn } from 'lib/shared-domain/questionnaire/presentation/Result/components/AnimateIn';
import { getTranslateByScope } from 'translation/i18n';
import {
  COMPANY_NAME_STORE_INDICATOR,
  EMAIL_STORE_INDICATOR,
  NAME_STORE_INDICATOR,
  PHONE_NUMBER_STORE_INDICATOR,
} from 'lib/shared-domain/questionnaire/presentation/Result/constants';

const fetchInviteeDetails = async (inviteeUri: string) => {
  try {
    const response = await fetch(inviteeUri, {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CALENDLY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch invitee details');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching invitee details:', error);
  }
};

const t = getTranslateByScope('result');
export const HighLeadFlow: React.FC<{ userCalendlyLink?: string }> = ({
  userCalendlyLink,
}) => {
  const { uniqueId, setAnswer } = useValuationStore();
  const { syncCurrentAnswersToSalesforce } = useSalesforceAnswerSync();
  const { syncLeadToSalesforce } = useSalesforceLeadSync();

  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: async (e) => {
      e.preventDefault();

      const {
        resource: {
          email, first_name, last_name, questions_and_answers, name,
        },
      } = await fetchInviteeDetails(e.data.payload.invitee.uri);

      setAnswer({
        id: EMAIL_STORE_INDICATOR,
        value: email,
      });
      setAnswer({
        id: PHONE_NUMBER_STORE_INDICATOR,
        value: questions_and_answers[0].answer,
      });
      setAnswer({
        id: NAME_STORE_INDICATOR,
        value: name || `${first_name} ${last_name}`,
      });

      // todo need to check for the right name
      if (questions_and_answers.length > 1) {
        setAnswer({
          id: COMPANY_NAME_STORE_INDICATOR,
          value: questions_and_answers[1].answer,
        });
      }

      await syncCurrentAnswersToSalesforce(
        uniqueId,
        'lastQuestion',
        100,
        'resultScreen',
        'lastQuestion',
        true,
      );

      await syncLeadToSalesforce(uniqueId);
    },
  });

  return (
    <AnimateIn>
      <QuestionText title={t('appointment.title')} />
      <InlineWidget url={userCalendlyLink} />
    </AnimateIn>
  );
};
