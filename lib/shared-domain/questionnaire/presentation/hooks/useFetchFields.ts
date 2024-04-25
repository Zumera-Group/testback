import {useValuationStore} from '../../store';
import {useEffect} from 'react';

export const useFetchFields = () => {
  const {questionnaire, fetchSalesforceFields} = useValuationStore();

  useEffect(() => {
    if (Array.isArray(questionnaire?.questionsByCategory)) {
      const fieldNames = [];
      questionnaire?.questionsByCategory.forEach((category) => {
        if (Array.isArray(category.questions)) {
          category.questions.forEach((question) => {
            if (question?.salesforceId) {
              fieldNames.push(question?.salesforceId);
            }
          });
        }
      });

      fetchSalesforceFields({only_text_fields: '1', fields: fieldNames});
    }
  }, [questionnaire?.questionsByCategory, fetchSalesforceFields]);
};