import { IAnnouncementTopBanner, SiteSettings } from '../domain/index';
import { ContentModule } from '../domain/contentModule';

import Header from 'components/Header';

interface Props {
  siteSettings: SiteSettings;
  contentModules: ContentModule[];
  darkBg?: boolean;
  whiteBg?: boolean;
  otherLangSlug?: string;
  hideHeader?: boolean;
  isLightHeader?: boolean;
  hideBurger?: boolean;
  staticExtended?: boolean;
  indicator?: {};
  hideMenu?: boolean;
  announcementTopBanner?: IAnnouncementTopBanner;
}

export const PageHeader: React.FC<Props> = ({
  siteSettings,
  contentModules,
  darkBg,
  otherLangSlug,
  hideHeader,
  isLightHeader,
  hideBurger,
  staticExtended,
  indicator,
  hideMenu,
  whiteBg,
}) => {
  return (
    <Header
      siteSettings={siteSettings}
      contentModules={contentModules}
      darkBg={darkBg}
      otherLangSlug={otherLangSlug}
      hideHeader={hideHeader}
      isLightHeader={isLightHeader}
      hideBurger={hideBurger}
      staticExtended={staticExtended}
      indicator={indicator}
      hideMenu={hideMenu}
      whiteBg={whiteBg}
    />
  );
};

export default PageHeader;
