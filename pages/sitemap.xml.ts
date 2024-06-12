import xmlBuilder, { XMLElement } from 'xmlbuilder';

import { fetchPages } from 'lib/shared-domain/page/application/useGetPages';
import { SanityService } from 'lib/services/sanity.service';
import { fetchServices } from '../lib/shared-domain/services/application/useGetServices';
import { fetchSectors } from '../lib/shared-domain/sectors/application/useGetSectors';
import { fetchNewsArticles } from '../lib/shared-domain/newsArticle/application/useGetNewsArticles';
import { fetchEmployees } from '../lib/shared-domain/employees/application/useGetEmployees';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import {createUrl, links} from '../lib/links';
import { fetchQuestionnaires } from '../lib/shared-domain/questionnaire/application/useGetQuestionnaires';
import {PageFacade} from '../lib/shared-domain/page/infrastructure/page.facade';
import {ISanityDoc} from '../lib/shared-domain/page/domain';
// import { fetchOffices } from '../lib/shared-domain/offices/application/useGetOffices';
// import { slugifyOffice } from 'lib/shared-domain/offices/application/slugifyOffice';
import {parse, formatISO, parseISO} from 'date-fns';
import {ILangRef} from "../@types/i18n";
import {SitemapFacade} from "../lib/shared-domain/sitemapFacade";

const Sitemap = () => {};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getUrl = (slug: string) => {
  return `${baseUrl}${slug}/`.replace(/&/g, '&amp;');
};
const getPageUrl = (locale: string, slug: string) => {
  return `${baseUrl}/${SanityService.getLocaleFromSanityLocale(
    locale,
  )}${slug}/`;
};

export const getServerSideProps = async ({ res }) => {
  // const pages = await fetchPages();
  //
  // const enTransactions = await fetchTransactions('en');
  // const deTransactions = await fetchTransactions('de');
  // const frTransactions = await fetchTransactions('fr');
  //
  // const enServices = await fetchServices('en');
  // const deServices = await fetchServices('de');
  // const frServices = await fetchServices('fr');
  //
  // const enSectors = await fetchSectors('en');
  // const deSectors = await fetchSectors('de');
  // const frSectors = await fetchSectors('fr');
  //
  // const enNews = await fetchNewsArticles('en');
  // const deNews = await fetchNewsArticles('de');
  // const frNews = await fetchNewsArticles('fr');
  //
  // const enEmployees = await fetchEmployees('en');
  // const deEmployees = await fetchEmployees('de');
  // const frEmployees = await fetchEmployees('fr');
  //
  // const questionnaires = await fetchQuestionnaires();
  //
  // const staticPages = pages
  //   ?.filter((page) => page.includeInSitemap && !page.hidePage)
  //   ?.map((page) => getPageUrl(page._lang, '/' + page.slug?.current));
  //
  // const staticQuestionnaires = questionnaires?.map((q) =>
  //   getUrl(
  //     links(SanityService.getLocaleFromSanityLocale(q._lang)).questionnaires(q),
  //   ),
  // );
  //
  // const staticTransactions = [...enTransactions, ...deTransactions, ...frTransactions]?.filter((t) => t?.slug?.current)
  //   .map((t) =>
  //     getUrl(
  //       links(SanityService.getLocaleFromSanityLocale(t._lang)).transactions(t),
  //     ),
  //   )
  // ;
  //
  // const staticServices = [...enServices, ...deServices, ...frServices]?.map((s) =>
  //   getUrl(links(SanityService.getLocaleFromSanityLocale(s._lang)).services(s)),
  // );
  //
  // const staticSectors = [...enSectors, ...deSectors, ...frSectors]?.map((s) =>
  //   getUrl(links(SanityService.getLocaleFromSanityLocale(s._lang)).sectors(s)),
  // );
  //
  // const staticNews = [...enNews, ...deNews, ...frNews]?.filter((n) => n?.slug?.current)
  //   .map((n) =>
  //     getUrl(
  //       links(SanityService.getLocaleFromSanityLocale(n._lang)).newsArticles(n),
  //     ),
  //   )
  // ;
  //
  // const staticEmployees = [...enEmployees, ...deEmployees, ...frEmployees]?.map((e) =>
  //   getUrl(
  //     links(SanityService.getLocaleFromSanityLocale(e._lang)).employees(e),
  //   ),
  // );

  // const staticOffices = [...enOffices, ...deOffices, ...frOffices]?.map((o) =>
  //   getUrl(
  //     '/' +
  //       SanityService.getLocaleFromSanityLocale(o._lang) +
  //       '/cdi-global/' +
  //       slugifyOffice(o.city),
  //   ),
  // );

  // const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  //   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  //     ${[
  //       ...staticPages,
  //       ...staticQuestionnaires,
  //       ...staticServices,
  //       ...staticSectors,
  //       ...staticNews,
  //       ...staticEmployees,
  //       // ...staticOffices,
  //       ...staticTransactions,
  //     ]
  //       .map((url) => {
  //         return `
  //           <url>
  //             <loc>${url}</loc>
  //             <lastmod>${new Date().toISOString()}</lastmod>
  //             <changefreq>monthly</changefreq>
  //             <priority>1.0</priority>
  //           </url>
  //         `;
  //       })
  //       .join('')}
  //   </urlset>
  // `;

  // res.setHeader('Content-Type', 'text/xml');
  // res.write(sitemap);

  const sitemap = await generateSitemap();

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

async function generateSitemap(): Promise<string> {
  const xmlRoot = xmlBuilder.begin().ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
  });

  await appendPages(xmlRoot);
  await appendTransactionsServicesSectors(xmlRoot);
  await appendNewsAndEmployees(xmlRoot);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xmlRoot.end({pretty: true})}`;
  // console.log(sitemap);
  return sitemap;
}

async function appendNewsAndEmployees(xmlRoot: XMLElement) {
  const sitemapFacade = new SitemapFacade();
  const rows = await sitemapFacade.getNewsAndEmployees();

  for (const doc of rows) {
    appendSanityDoc(xmlRoot, doc);
  }
}

async function appendTransactionsServicesSectors(xmlRoot: XMLElement) {
  const sitemapFacade = new SitemapFacade();
  const rows = await sitemapFacade.getTransactionsServicesSectors();

  for (const doc of rows) {
    appendSanityDoc(xmlRoot, doc);
  }
}
async function appendPages(xmlRoot: XMLElement) {
  const sitemapFacade = new SitemapFacade();
  const pages = await sitemapFacade.getPagesWithLandings();

  for (const page of pages) {
    appendSanityDoc(xmlRoot, page);
  }
}

function appendSanityDoc(xmlParent: XMLElement, doc: ISanityDoc) {
  if (!doc._lang) {
    return;
  }

  const locale = SanityService.getLocaleFromSanityLocale(doc._lang);
  const url = createUrl({type: doc._type, locale, slug: doc.slug!.current, isAbsolute: true});

  const xmlUrl = xmlParent.ele('url');
  xmlUrl.ele('loc', url);
  xmlUrl.ele('changefreq', 'monthly');
  xmlUrl.ele('priority', '0.5');

  if (doc._updatedAt) {
    const updatedAt = parseAndFormatUpdatedAt(doc._updatedAt);
    if (updatedAt) {
      xmlUrl.ele('lastmod', updatedAt);
    }
  }

  const alternates = makeAlternates(doc);
  if (alternates.length > 1) {
    for (const {url, lang} of alternates) {
      xmlUrl.ele('xhtml:link', {
        rel: 'alternate',
        hreflang: lang,
        href: url
      });
    }
  }
}

const parseAndFormatUpdatedAt = (date: string): null|string => {
  if (date) {
    try {
      return formatISO(parseISO(date));
    } catch (e) {
      console.error(`err for parseAndFormatUpdatedAt:`, e);
    }
  }

  return null;
};



const makeAlternates = (doc: ISanityDoc): IAlternateHref[] => {
  let langRefs: ILangRef[] = [];

  if (doc.__i18n_base && Array.isArray(doc.__i18n_base._langRefs)) {
    langRefs = doc.__i18n_base._langRefs.filter(
      (ref) => ref !== null,
    );

    langRefs.push({
      _id: doc.__i18n_base._id,
      _lang: doc.__i18n_base._lang,
      slug: doc.__i18n_base.slug,
    });
  } else if (Array.isArray(doc._langRefs) && doc._langRefs[0] !== null) {
    langRefs = doc._langRefs.filter((ref) => ref !== null);

    //we also need to add link to the doc itself to have links in all langs - including the current one:
    //https://developers.google.com/search/docs/specialty/international/localized-versions?hl=en#language-codes
    langRefs.push({
      _id: doc._id,
      _lang: doc._lang,
      slug: doc.slug
    });
  }

  const out: IAlternateHref[] = [];
  for (const { _lang, slug } of langRefs) {
    if (_lang && slug) {
      const lang = SanityService.getLocaleFromSanityLocale(_lang);
      const url = createUrl({
        type: doc._type,
        locale: lang,
        slug: slug.current,
        isAbsolute: true
      });

      out.push({url, lang});
    }
  }

  return out;
};

interface IAlternateHref {
  url: string,
  lang: string
}