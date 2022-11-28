/* eslint-disable @next/next/no-css-tags */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import TagManager from 'react-gtm-module';

import { ColorModeScript } from '@chakra-ui/react';
import createEmotionServer from '@emotion/server/create-instance';
import emotionCache from 'lib/emotion.cache';
import { EnvironmentService } from 'environment.service';

const { extractCritical } = createEmotionServer(emotionCache);

const tagManagerArgs = {
  gtmId: 'GTM-PXQZLHF',
};

if (process.browser && EnvironmentService.isProduction()) {
  TagManager.initialize(tagManagerArgs);
}

export const FontFaceWorkaround = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
            @font-face {
                font-family: "Condor";
                font-weight: normal;
                font-display: swap;
                src: url("/fonts/Condor-Regular-Testing.otf");
            }`,
    }}
  />
);
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document?.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);
    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <style
          key="emotion-css"
          dangerouslySetInnerHTML={{ __html: styles.css }}
          data-emotion-css={styles.ids.join(' ')}
        />,
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          {process.env.NEXT_PUBLIC_USE_NO_INDEX_TAG === 'true' && (
            <meta name="robots" content="noindex" />
          )}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="preconnect" href="https://cdn.sanity.io" />
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
          <link rel="dns-prefetch" href="https://consent.cookiefirst.com" />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/otf"
            href="/fonts/Condor-Regular-Testing.otf"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          />
          <FontFaceWorkaround />
          <link rel="shortcut icon" href="/favicon.ico" />

          {EnvironmentService.isProduction() && (
            <>
              <style
                dangerouslySetInnerHTML={{
                  __html: `.async-hide { opacity: 0 !important}`,
                }}
              ></style>
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
})(window,document.documentElement,'async-hide','dataLayer',4000,
{'GTM-PXQZLHF':true});`,
                }}
              ></script>
            </>
          )}

          {EnvironmentService.isProduction() && (
            <>
              <style
                dangerouslySetInnerHTML={{
                  __html: `.async-hide { opacity: 0 !important}`,
                }}
              ></style>
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
})(window,document.documentElement,'async-hide','dataLayer',4000,
{'GTM-PXQZLHF':true});`,
                }}
              ></script>
            </>
          )}
        </Head>
        <body>
          {EnvironmentService.isProduction() && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PXQZLHF" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            ></noscript>
          )}

          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
