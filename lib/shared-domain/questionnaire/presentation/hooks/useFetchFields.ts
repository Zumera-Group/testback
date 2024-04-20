import {useValuationStore} from '../../store';
import {useEffect} from 'react';

export const useFetchFields = () => {
  const {questionnaire, fetchSalesforceFields} = useValuationStore();

  useEffect(() => {
    console.log('changed: questionnaire?.questionsByCategory', questionnaire?.questionsByCategory);
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

      // console.log('fieldNames:', fieldNames);
      fetchSalesforceFields({only_text_fields: '1', fields: fieldNames});
      // facade.getFields({only_text_fields: '1', fields: fieldNames}).then((fields) => {
      //   console.log('fields:', fields);
      // })
    }
  }, [questionnaire?.questionsByCategory, fetchSalesforceFields]);
};