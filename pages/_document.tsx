/* eslint-disable @next/next/no-css-tags */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import TagManager from 'react-gtm-module';
import { IconSprite } from 'components/Icon';

import { EnvironmentService } from 'environment.service';

const tagManagerArgs = {
  gtmId: 'GTM-PXQZLHF',
};

if (process.browser && EnvironmentService.isProduction()) {
  TagManager.initialize(tagManagerArgs);
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document?.getInitialProps(ctx);
    return {
      ...initialProps,
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
          <link rel="preconnect" href="https://cdn.sanity.io" />
          <link rel="dns-prefetch" href="https://cdn.sanity.io" />
          <link rel="dns-prefetch" href="https://consent.cookiefirst.com" />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Yellix-Bold.woff2"
          />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Yellix-BoldItalic.woff2"
          />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Yellix-Light.woff2"
          />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Yellix-LightItalic.woff2"
          />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Yellix-Medium.woff2"
          />
          <link
            crossOrigin="anonymous"
            rel="preload"
            as="font"
            type="font/woff2"
            href="/fonts/Yellix-MediumItalic.woff2"
          />
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
          <IconSprite />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
