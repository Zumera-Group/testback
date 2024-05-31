import React from 'react';
import { PageHeader } from '../lib/shared-domain/page/presentation/PageHeader';
import { SiteSettings } from '../lib/shared-domain/page/domain/index';
import { fetchSiteSettings } from '../lib/shared-domain/page/application/useGetSiteSettings';
import { SharedContentFacade } from '../lib/shared-domain/page/infrastructure/sharedContent.facade';
import { FourOFour } from 'components/FourOFour';
import PageFooter from 'lib/shared-domain/page/presentation/PageFooter';
import Head from 'next/head';

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

export default function Custom404Page({
  siteSettings,
  sharedContent,
}: PageProps): JSX.Element {
  return (
    <div>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <PageHeader
        contentModules={[]}
        siteSettings={siteSettings}
        darkBg={true}
      />
      <FourOFour title={sharedContent.text404} />
      <PageFooter siteSettings={siteSettings} />
    </div>
  );
}
