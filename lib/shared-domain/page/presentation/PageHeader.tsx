import { IAnnouncementTopBanner, SiteSettings } from '../domain/index';
import { ContentModule } from '../domain/contentModule';

import Header from 'components/Header';
import { IAlternateLangHrefs } from '../../../../@types/i18n';

interface Props {
  siteSettings: SiteSettings;
  contentModules?: ContentModule[];
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
  langAlternates?: IAlternateLangHrefs
}

export const PageHeader: React.FC<Props> = ({
  siteSettings,
  contentModules = [],
  darkBg,
  hideHeader,
  isLightHeader,
  hideBurger,
  staticExtended,
  indicator,
  hideMenu,
  whiteBg,
  langAlternates
}) => {
  return (
    <Header
      siteSettings={siteSettings}
      contentModules={contentModules}
      darkBg={darkBg}
      hideHeader={hideHeader}
      isLightHeader={isLightHeader}
      hideBurger={hideBurger}
      staticExtended={staticExtended}
      indicator={indicator}
      hideMenu={hideMenu}
      whiteBg={whiteBg}
      langAlternates={langAlternates}
    />
  );
};

export default PageHeader;
