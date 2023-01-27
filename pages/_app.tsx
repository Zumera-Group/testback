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
      TagManager.initialize({ gtmId: 'GTM-PXQZLHF'})
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Script
        async
        defer
        strategy="lazyOnload"
        src="https://consent.cookiefirst.com/banner.js"
        data-cookiefirst-key="dd7fd031-9337-411f-839c-774530a85280"
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
        async
        defer
        // strategy="lazyOnload"
        src="https://assets.calendly.com/assets/external/widget.js"
      />
      <Script
        async
        defer
        id="ga-2"
        dangerouslySetInnerHTML={{
          __html: `Calendly.initInlineWidget({
            url: 'https://calendly.com/saxenhammer'
            });`,
        }}
      />
    </>
  );
}

export default MyApp;
