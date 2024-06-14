interface Dimensions {
  height: number;
  width: number;
}

interface Asset {
  url: string;
  metadata: {
    dimensions: Dimensions;
  };
}

interface Icon {
  name: string;
  iconImage: {
    asset: Asset;
  };
}

interface CalculatorPage {
  _id: string;
  _lang: string;
  questionnaireName: string;
  questionnaireSlug: {
    current: string
  };
}

interface BoxSelector {
  _key: string;
  boxContent: string;
  label: string;
  boxIcon: Icon;
  calculatorPage: CalculatorPage;
}

interface PreQuestionnaireData {
  _id: string;
  _lang: string;
  preCalculatorName: string;
  seoDescription: string;
  seoImage: {
    asset: Asset;
  };
  question: {
    questionText: string;
    description?: string;
  };
  preventIndexing: boolean;
  boxSelector: BoxSelector[];
  nextButtonText: string;
}

type QueryPreQuestionnaire = (lang: string, slug: string) => string;