import { Description } from '../../page/domain/index';
import { ContentModuleType } from '../../page/domain/contentModule';
import { ILangRef } from '../../../../@types/i18n';

export interface Landings {
  _id: string;
  _lang: string;
  _langRefs?: ILangRef[],
  __i18n_base?: {
    _id: string;
    _lang: string;
    slug: {
      current: string;
    },
    _langRefs?: ILangRef[];
  },
  landingSlug: {
    current: string;
  };
  landingName: string;
  seoImage: {
    asset: {
      url: string;
    };
  };
  hidePage: boolean;
  seoDescription: string;
  whiteBg?: string;
  description: Description[];
  contentModules: {
    _key: string;
    _type: ContentModuleType;
  }[];
}
