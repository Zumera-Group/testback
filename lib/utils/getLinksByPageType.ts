import { allLinks } from "lib/links";

export const getLinksByPageType = (locale, pageType, slug) => {
  const linkTypePart = {
    sector: allLinks.sectors[locale],
    valueCalculator: allLinks.questionnaires[locale],
    employee: allLinks.employees[locale],
    transaction: allLinks.transactions[locale],
    newsArticle: 'news',
    service: allLinks.services[locale],
    landings: 'landing',
    taxCalculator: allLinks.taxCalculator[locale],
    page: '',
  }[pageType];

  return `${linkTypePart ? '/' + linkTypePart + '/' : ''}${slug}`;
};
