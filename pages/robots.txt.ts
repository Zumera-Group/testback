import { fetchPages } from 'lib/shared-domain/page/application/useGetPages';
import { SanityService } from 'lib/services/sanity.service';
import { fetchLandings } from 'lib/shared-domain/valuation-tool/application/useGetLandings';
import { links } from 'lib/links';

const Robots = () => {};

export const getServerSideProps = async ({ res }) => {
  const sitemapUrl = process.env.NEXT_PUBLIC_BASE_URL + '/sitemap.xml';

  const pages = await fetchPages();
  const landings = await fetchLandings();

  const staticPages = pages
    .filter((page) => page.disallowInRobotsTxt)
    .map((page) => {
      return `/${SanityService.getLocaleFromSanityLocale(page._lang)}/${
        page.slug?.current
      }/`;
    });

  const landingPages = landings.map((landing) => {
    return links(
      SanityService.getLocaleFromSanityLocale(landing._lang),
    ).landings(landing);
  });

  const disallowedPages = [...landingPages, ...staticPages];

  const robots = `User-Agent: *\n${disallowedPages
    .map((url) => `Disallow: ${url}`)
    .join('\n')}\nSitemap: ${sitemapUrl}`;

  res.setHeader('Content-Type', 'document');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
};

export default Robots;
