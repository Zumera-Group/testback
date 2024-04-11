import { Category, Questionnaire } from 'lib/shared-domain/questionnaire/domain';

export interface TaxCalculatorQuestionnaire {
  _id: string;
  _lang: string;
  questionnaireName: string;
  questionnaireSlug: {
    current: string;
  };
  seoDescription: string;
  seoImage: {
    asset: {
      url: string;
    };
  };
  preventIndexing?: boolean;
  questionsByCategory: Category[];
  resultScreenCopy: ResultScreenCopy;
  resultScreenModules: Questionnaire['result'];
  variantOfTheResultPage: 'compact' | 'default';
}

interface ResultScreenCopy {
  questionTitle: QuestionTitle;
  formFields: FormFields;
}

interface FormFields {
  nameLabel: string;
  nameRequiredError: string;
  emailLabel: string;
  emailRequiredError: string;
  emailInvalidError: string;
  phoneNumberLabel: string;
  phoneNumberRequiredError: string;
  checkBoxfirst?: string;
  checkBoxSecond?: string;
  checkBoxThird?: string;
  checkBoxLink?: string;
  successMessage: string;
  buttonText: string;
}

interface QuestionTitle {
  title: string;
  tooltipPrompt: string;
  tooltipDescription: string;
}
