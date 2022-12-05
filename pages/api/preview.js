/* eslint-disable no-undef */
import { enPaths, dePaths } from '../../lib/shared-domain/page/paths';
import { slugifyOffice } from '../../lib/shared-domain/offices/application/slugifyOffice';

const langs = {
  en: enPaths,
  de: dePaths,
};

export default async function preview(req, res) {
  const corsOrigin =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3333`
      : `https://saxenhammer-sanity-staging.herokuapp.com`;

  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!req?.query?.secret) {
    return res.status(401).json({ message: 'No secret token' });
  }

  if (req?.query?.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (!req?.query?.slug) {
    return res.status(401).json({ message: 'No slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  if (req?.query?.type === 'valueCalculator') {
    const pageSlug =
      req?.query?.lang === 'de' ? 'fragenkatalog' : 'questionnaires';
    res.writeHead(307, {
      Location: `/${req?.query?.lang}/${pageSlug}/${req?.query?.slug}` ?? `/`,
    });
  } else if (req?.query?.type === 'office') {
    const pageSlug = langs[req?.query?.lang][6];
    res.writeHead(307, {
      Location:
        `/${req?.query?.lang}/${pageSlug}/${slugifyOffice(req?.query?.slug)}` ??
        `/`,
    });
  } else if (req?.query?.type === 'valuationToolLanding') {
    res.writeHead(307, {
      Location: `/${req?.query?.lang}/landing/${req?.query?.slug}` ?? `/`,
    });
  } else if (req?.query?.type === 'employee') {
    const pageSlug = req?.query?.lang === 'de' ? 'mitarbeiter' : 'employees';
    res.writeHead(307, {
      Location: `/${req?.query?.lang}/${pageSlug}/${req?.query?.slug}` ?? `/`,
    });
  } else if (req?.query?.type !== 'page') {
    // check if any element of lang.en includes type
    const pageIndex = langs.en.findIndex(
      (el) => el.includes(req?.query?.type) || req?.query?.type.includes(el),
    );
    // if exists get the page slug from the current lang array
    const pageSlug = langs[req?.query?.lang][pageIndex];
    res.writeHead(307, {
      Location: `/${req?.query?.lang}/${pageSlug}/${req?.query?.slug}` ?? `/`,
    });
  } else {
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, {
      Location: `/${req?.query?.lang}/${req?.query?.slug}` ?? `/`,
    });
  }

  res.end();
}
