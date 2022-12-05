import Head from 'next/head';
import React from 'react';
import { SiteSettings } from '../lib/shared-domain/page/domain/index';

export const SEO: React.FC<{
  seoTitle: string;
  seoDescription: string;
  seoImage?: { asset: { url: string } };
  siteSettings: SiteSettings;
}> = ({ seoTitle, seoImage, seoDescription, siteSettings }) => {
  const title = seoTitle + ' | ' + siteSettings.siteName;
  const image = seoImage?.asset?.url;
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="UTF-8" />
      <meta name="title" content={title} />
      <meta itemProp="name" content={title} />
      <meta property="og:title" content={title} />

      <meta name="description" content={seoDescription} />
      <meta itemProp="description" content={seoDescription} />
      <meta itemProp="og:description" content={seoDescription} />

      <meta itemProp="og:type" content="website" />
      <meta itemProp="og:site_name" content={siteSettings.siteName} />

      <meta itemProp="og:image" content={image} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="website" />
      <meta name="twitter:site" content={siteSettings.siteName} />
      <meta name="twitter:creator" content={siteSettings.siteName} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
