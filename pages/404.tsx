import React from 'react';
import bgImage from 'public/404-bg.jpg';
import { FlexCenterPage, FlexCol } from '../components/Layout/Flex/Flex';
import { P } from 'components/Typography/P';
import { useSharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';
import { H } from '../components/Typography/H';
import { colors } from '../styles/foundations/colors';
import { PageHeader } from '../lib/shared-domain/page/presentation/PageHeader';
import { SiteSettings } from '../lib/shared-domain/page/domain/index';
import { fetchSiteSettings } from '../lib/shared-domain/page/application/useGetSiteSettings';
import { SharedContentFacade } from '../lib/shared-domain/page/infrastructure/sharedContent.facade';
import { SharedContentContext } from 'lib/shared-domain/page/infrastructure/sharedContentContext';

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

export const Custom404: React.FC<{ siteSettings: SiteSettings }> = ({
  siteSettings,
}) => {
  const data = useSharedContentContext();

  return (
    <FlexCol
      width="100%"
      height="100vh"
      justifyContent="center"
      backgroundImage={`url("${bgImage.src}")`}
      align="center"
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <PageHeader contentModules={[]} siteSettings={siteSettings} />
      <FlexCenterPage>
        <H variant="h404" color={colors.primary.darkGreen} mb={4}>
          404
        </H>
        <P variant="p404" color={colors.text.light}>
          {data?.text404}
        </P>
      </FlexCenterPage>
    </FlexCol>
  );
};

export default function Custom404Page({
  siteSettings,
  sharedContent,
}: PageProps): JSX.Element {
  return (
    <SharedContentContext value={sharedContent}>
      <Custom404 siteSettings={siteSettings} />
    </SharedContentContext>
  );
}
