import React from 'react';
import { FlexCol } from '../components/Layout/Flex/Flex';
import { PageHeader } from '../lib/shared-domain/page/presentation/PageHeader';
import { SiteSettings } from '../lib/shared-domain/page/domain/index';
import { fetchSiteSettings } from '../lib/shared-domain/page/application/useGetSiteSettings';
import { SharedContentFacade } from '../lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { FourOFour } from 'components/FourOFour';
import PageFooter from 'lib/shared-domain/page/presentation/PageFooter';

export async function getStaticProps({ locale }) {
  const siteSettings = await fetchSiteSettings(locale);
  const sharedContent = await new SharedContentFacade().getSharedContentFacade(
    locale,
  );
  return {
    props: { siteSettings, sharedContent },
  };
}

interface PageProps {
  siteSettings: SiteSettings;
  sharedContent: any;
}

export const Custom404: React.FC<{
  siteSettings: SiteSettings;
  sharedContent: any;
}> = ({ siteSettings, sharedContent }) => {
  return (
    <FlexCol
      width="100%"
      justifyContent="center"
      align="center"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        darkBg={true}
      />
      <FourOFour title={sharedContent.text404} />
      <PageFooter siteSettings={siteSettings} />
    </FlexCol>
  );
};

export default function Custom404Page({
  siteSettings,
  sharedContent,
}: PageProps): JSX.Element {
  return (
    <SharedContentContext value={sharedContent}>
      <Custom404 siteSettings={siteSettings} sharedContent={sharedContent} />
    </SharedContentContext>
  );
}
