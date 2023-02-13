import { Description } from '../../page/domain/index';
import { ContentModuleType } from '../../page/domain/contentModule';

export interface Landings {
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
  contentModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}
