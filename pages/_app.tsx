import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { EnvironmentService } from 'environment.service';

import { IntercomProvider } from 'react-use-intercom';
import TagManager from 'react-gtm-module';

import '../styles/globals.scss';
import localFont from '@next/font/local';
import { IconSprite } from 'components/Icon';

const INTERCOM_APP_ID = 'lwrptr1h';

const myFont = localFont({
  // variable:
  display: 'swap',
  src: [
    {
      path: '../public/fonts/Yellix-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Yellix-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Yellix-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const element = document.querySelector('html');
    element.classList.add('mobileLoaded');
  }, []);
  MarketingParamsService.useSaveOnMount();

  // Initialise Google tag manager
  useEffect(() => {
    if (process.browser && EnvironmentService.isProduction()) {
      TagManager.initialize({ gtmId: 'GTM-PXQZLHF' });
    }
  }, []);

  // const lang = router.locale;
  // const slug = router.state.asPath.

  const stringData = JSON.parse(
    JSON.stringify(pageProps).replace(/\u2028/g, ''),
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <IntercomProvider
        appId={INTERCOM_APP_ID}
        autoBoot
        autoBootProps={{ hideDefaultLauncher: true }}
      >
        <main className={myFont.className} {...myFont}>
          <Component {...stringData} key={router.pathname} />
        </main>
      </IntercomProvider>

      <Script
        strategy="lazyOnload"
        src="https://assets.calendly.com/assets/external/widget.js"
        // strategy="worker"
      />
      {/*<link rel="canonical" href={`https://www.zumera.com/${lang}/${slug}`} />*/}
      <IconSprite />
    </>
  );
}

export default MyApp;
