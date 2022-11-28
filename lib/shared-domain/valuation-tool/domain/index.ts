import { Question } from 'lib/shared-domain/questionnaire/domain';
import { Description } from '../../page/domain/index';
import { ContentModuleType } from '../../page/domain/contentModule';

export interface VTLanding {
  _id: string;
  _lang: string;
  landingSlug: {
    current: string;
  };
  landingName: string;
  seoImage: {
    asset: {
      url: string;
    };
  };
  seoDescription: string;
  description: Description[];
  buttonText: string;
  externalButtonUrl: string;
  questionnaire: {
    questionnaireSlug: {
      current: string;
    };
  };
  secondButtonText: string;
  fileToDownload: {
    asset: {
      url: string;
    };
    description: string;
  };
  question: Question;
  contentModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}
