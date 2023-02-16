export interface BoxIconImageSize {
  dimensions: {
    height: number;
    width: number;
  };
}

export interface BoxIconImage {
  asset: {
    url: string;
    metadata: BoxIconImageSize;
  };
}

export interface BoxIcon {
  name: string;
  iconImage: BoxIconImage;
}

export interface BoxAnswer {
  label: string;
  boxContent: string;
  boxIcon?: BoxIcon;
  _key: string;
  sheetName?: string;
}

export interface Answer {
  answerType:
    | 'boxSelector'
    | 'textInput'
    | 'orbitSelector'
    | 'multiTextInput'
    | 'numberInput';
  boxSelector?: BoxAnswer[];
  textInput?: string;
  multiTextInput?: {
    fieldTitle: string;
    fieldPlaceholder: string;
  }[];
  orbitSelector?: {
    lowestValue: string;
    highestValue: string;
    answerOptions: { label: string; value: string }[];
  };
  numberInput?: {
    valueType: 'number' | 'EUR' | 'USD' | 'year' | 'age' | 'percent';
    salesforceFormat: 'number' | 'date_year' | 'date_month' | 'date_day';
    placeholder: string;
    label: string;
  };
}

export interface Question {
  isRequired: boolean;
  _id: string;
  answerSelector: Answer;
  showMoreButton?: string;
  hasMultipleAnswers?: boolean;
  navigationTitle: string;
  questionId: string;
  salesforceId: string;
  questionText: string;
  description: string;
  _lang: string;
  industries: {
    id: string;
    name: string;
  }[];
}

export interface Category {
  categoryName: string;
  questions: Question[];
  isSectorSpecificCategory?: boolean;
}

export interface SanityIcon {
  name: string;
  iconImage: {
    asset: {
      metadata: {
        dimensions: {
          height: number;
          width: number;
        };
      };
      url: string;
    };
  };
}

export interface SectorSpecific {
  hasSectorSpecificQuestions: boolean;
  sectorSpecificBeginOrEnd: 'after' | 'before';
}

export interface Questionnaire {
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
  questionsByCategory: Category[];
  sectorSpecific: SectorSpecific;
  checkmarkTexts: string[];
  _id: string;
  _lang: string;
}
