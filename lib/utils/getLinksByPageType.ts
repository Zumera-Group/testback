export const getLinksByPageType = (locale, pageType, slug) => {
  const linkTypePart = {
    sector: locale === 'en' ? 'sectors' : 'sektoren',
    valueCalculator: locale === 'en' ? 'questionnaires' : 'fragenkatalog',
    employee: locale === 'en' ? 'employees' : 'mitarbeiter',
    transaction: locale === 'en' ? 'transactions' : 'transaktionen',
    newsArticle: 'news',
    service: locale === 'en' ? 'services' : 'leistungsspektrum',
    landings: 'landing',
    page: '',
  }[pageType];

  return `${linkTypePart ? linkTypePart + '/' : ''}${slug}`;
};
