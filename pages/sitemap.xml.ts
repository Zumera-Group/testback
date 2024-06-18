import xmlBuilder, { XMLElement } from 'xmlbuilder';
import { SanityService } from 'lib/services/sanity.service';
import {createUrl} from '../lib/links';
import {ISanityDoc} from '../lib/shared-domain/page/domain';
import {formatISO, parseISO} from 'date-fns';
import {ILangRef} from '../@types/i18n';
import {SitemapFacade} from "../lib/shared-domain/sitemapFacade";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const sitemap = await generateSitemap();

  res.setHeader('Content-Type', 'text/xml');
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
  await appendBlogArticles(xmlRoot);
  await appendQuestionnaires(xmlRoot);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>${xmlRoot.end({pretty: true})}`;
  // console.log(sitemap);
  return sitemap;
}

async function appendQuestionnaires(xmlRoot: XMLElement) {
  const sitemapFacade = new SitemapFacade();
  const rows = await sitemapFacade.getQuestionnaires();

  for (const doc of rows) {
    appendSanityDoc(xmlRoot, doc);
  }
}

async function appendBlogArticles(xmlRoot: XMLElement) {
  const sitemapFacade = new SitemapFacade();
  const rows = await sitemapFacade.getBlogArticles();

  for (const doc of rows) {
    appendSanityDoc(xmlRoot, doc);
  }
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
    langRefs = doc.__i18n_base._langRefs
      .filter(
        (ref) => ref !== null && !ref.hidePage,
      )
    ;

    if (!doc.__i18n_base.hidePage) {
      langRefs.push({
        _id: doc.__i18n_base._id,
        _lang: doc.__i18n_base._lang,
        slug: doc.__i18n_base.slug,
      });
    }
  } else if (Array.isArray(doc._langRefs) && doc._langRefs[0] !== null) {
    langRefs = doc._langRefs.filter((ref) => ref !== null && !ref.hidePage);

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