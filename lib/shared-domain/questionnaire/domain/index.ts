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
  category?: string;
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
  sustainabilityNoahCategory: string;
  growthNoahCategory: string;
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

type Slug = {
  current: string;
  _type?: string; // Optional property
};

type AssetMetadata = {
  dimensions: AssetMetadataDimensions;
};

type Asset = {
  url: string;
  type: null;
  metadata: AssetMetadata
};

type Author = {
  firstName: string;
  lastName: string;
  email: string | null; // Allows both string and null
  slug: Slug;
  jobTitle: string;
  calendlyURL: string | null; // Allows both string and null
  _id: string;
  title: string;
  cardPicture: {
    asset: Asset;
  };
};

type Authors = {
  authorsTitle: string;
  author1: Author;
  author2: Author;
};

type TextElement = {
  title?: string;
  subtitle: string;
  _type: 'textElement';
  _key: string;
};

type GrowthRate = TextElement[];

type Block = {
  children: Span[];
  _type: 'block';
  style: string;
  _key: string;
  markDefs: any[];
};

type Span = {
  _type: 'span';
  marks: any[];
  text: string;
  _key: string;
};

type HeroDescription = Block[];

type AssetMetadataDimensions = {
  height: number;
  width: number;
};


type Logo = {
  asset: Asset;
};

type LogoBarSection = {
  title: string;
  logos: Logo[];
};

type PageContent = {
  greenCheckmarkTexts: string[];
  authors: Authors;
  growthRatesTable: {
    growthRates: GrowthRate;
  };
  heroSection: {
    heroDescription: HeroDescription;
    heroSecondTitle: string;
    heroTitle: string;
  };
  logoBarSection: LogoBarSection;
};


export interface Questionnaire {
  result?: {
    greenCheckmarkTexts?: string[];
    authors?: Authors,
    growthRatesTable?: {
      growthRates: GrowthRate;
    },
    heroSection?: {
      heroDescription: HeroDescription;
      heroSecondTitle: string;
      heroTitle: string;
    },
    logoBarSection?: LogoBarSection
  };
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
  isNoah: boolean;
  questionsByCategory: Category[];
  sectorSpecific: SectorSpecific;
  checkmarkTexts: string[];
  _id: string;
  _lang: string;
  variantOfTheResultPage: 'compact' | 'default';
}
