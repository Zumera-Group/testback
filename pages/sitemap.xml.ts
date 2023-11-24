import { fetchPages } from 'lib/shared-domain/page/application/useGetPages';
import { SanityService } from 'lib/services/sanity.service';
import { fetchServices } from '../lib/shared-domain/services/application/useGetServices';
import { fetchSectors } from '../lib/shared-domain/sectors/application/useGetSectors';
import { fetchNewsArticles } from '../lib/shared-domain/newsArticle/application/useGetNewsArticles';
import { fetchEmployees } from '../lib/shared-domain/employees/application/useGetEmployees';
import { fetchTransactions } from 'lib/shared-domain/transactions/application/useGetTransactions';
import { links } from '../lib/links';
import { fetchQuestionnaires } from '../lib/shared-domain/questionnaire/application/useGetQuestionnaires';
import { fetchOffices } from '../lib/shared-domain/offices/application/useGetOffices';
import { slugifyOffice } from 'lib/shared-domain/offices/application/slugifyOffice';

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
  const pages = await fetchPages();

  const enTransactions = await fetchTransactions('en');
  const deTransactions = await fetchTransactions('de');

  const enServices = await fetchServices('en');
  const deServices = await fetchServices('de');

  const enSectors = await fetchSectors('en');
  const deSectors = await fetchSectors('de');

  const enNews = await fetchNewsArticles('en');
  const deNews = await fetchNewsArticles('de');

  const enEmployees = await fetchEmployees('en');
  const deEmployees = await fetchEmployees('de');

  const enOffices = await fetchOffices('en');
  const deOffices = await fetchOffices('de');

  const questionnaires = await fetchQuestionnaires();

  const staticPages = pages
    ?.filter((page) => page.includeInSitemap)
    ?.map((page) => getPageUrl(page._lang, '/' + page.slug?.current));

  const staticQuestionnaires = questionnaires?.map((q) =>
    getUrl(
      links(SanityService.getLocaleFromSanityLocale(q._lang)).questionnaires(q),
    ),
  );

  const staticTransactions = [...enTransactions, ...deTransactions]?.map((t) =>
    getUrl(
      links(SanityService.getLocaleFromSanityLocale(t._lang)).transactions(t),
    ),
  );

  const staticServices = [...enServices, ...deServices]?.map((s) =>
    getUrl(links(SanityService.getLocaleFromSanityLocale(s._lang)).services(s)),
  );

  const staticSectors = [...enSectors, ...deSectors]?.map((s) =>
    getUrl(links(SanityService.getLocaleFromSanityLocale(s._lang)).sectors(s)),
  );

  const staticNews = [...enNews, ...deNews]?.map((n) =>
    getUrl(
      links(SanityService.getLocaleFromSanityLocale(n._lang)).newsArticles(n),
    ),
  );

  const staticEmployees = [...enEmployees, ...deEmployees]?.map((e) =>
    getUrl(
      links(SanityService.getLocaleFromSanityLocale(e._lang)).employees(e),
    ),
  );

  const staticOffices = [...enOffices, ...deOffices]?.map((o) =>
    getUrl(
      '/' +
        SanityService.getLocaleFromSanityLocale(o._lang) +
        '/cdi-global/' +
        slugifyOffice(o.city),
    ),
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[
        ...staticPages,
        ...staticQuestionnaires,
        ...staticServices,
        ...staticSectors,
        ...staticNews,
        ...staticEmployees,
        ...staticOffices,
        ...staticTransactions,
      ]
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
