import { SiteSettings } from '../domain/index';
import { ContentModule } from '../domain/contentModule';

import Header from 'components/Header';

interface Props {
  siteSettings: SiteSettings;
  contentModules: ContentModule[];
  darkBg?: boolean;
  otherLangSlug?: string;
  hideHeader?: boolean;
  isLightHeader?: boolean;
}

export const PageHeader: React.FC<Props> = ({
  siteSettings,
  contentModules,
  darkBg,
  otherLangSlug,
  hideHeader,
  isLightHeader,
}) => {
  return (
    <Header
      siteSettings={siteSettings}
      contentModules={contentModules}
      darkBg={darkBg}
      otherLangSlug={otherLangSlug}
      hideHeader={hideHeader}
      isLightHeader={isLightHeader} />
  );
};

export default PageHeader;