import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import emotionCache from 'lib/emotion.cache';
import { MarketingParamsService } from 'lib/shared-domain/salesforce/application/marketingParamsService';
import Script from 'next/script';
import { IntercomProvider } from 'react-use-intercom';
import theme from '../styles/theme';
import Head from 'next/head';
import './styles.css';

const INTERCOM_APP_ID = 'lwrptr1h';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const element = document.querySelector('html');
    element.classList.add('mobileLoaded');
    localStorage.removeItem('chakra-ui-color-mode');
  }, []);
  MarketingParamsService.useSaveOnMount();

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
      <Script
        async
        defer
        id="ga-1"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-PXQZLHF');`,
        }}
      />
      <Script
        async
        defer
        id="ga-2"
        dangerouslySetInnerHTML={{
          __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'G-8BMG9ZVQHK', 'auto');
    ga('send', 'pageview');`,
        }}
      />

      <CacheProvider value={emotionCache}>
        <ChakraProvider resetCSS theme={theme}>
          <IntercomProvider
            initializeDelay={10000}
            appId={INTERCOM_APP_ID}
            autoBoot
            autoBootProps={{ hideDefaultLauncher: true }}
          >
            <Component {...pageProps} />
          </IntercomProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
