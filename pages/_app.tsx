import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import { EnvironmentService } from 'environment.service';

import { IntercomProvider } from 'react-use-intercom';
import TagManager from 'react-gtm-module';

import '../styles/globals.scss';

const INTERCOM_APP_ID = 'lwrptr1h';

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

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Script
        strategy="worker"
        src="https://consent.cookiefirst.com/banner.js"
        data-cookiefirst-key="187e6cb5-6683-48db-9a01-a5892c9f29d2"
      />
      <IntercomProvider
        initializeDelay={10000}
        appId={INTERCOM_APP_ID}
        autoBoot
        autoBootProps={{ hideDefaultLauncher: true }}
      >
        <Component {...pageProps} key={router.pathname} />
      </IntercomProvider>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="worker"
      />
      {/*<link rel="canonical" href={`https://www.zumera.com/${lang}/${slug}`} />*/}
    </>
  );
}

export default MyApp;
