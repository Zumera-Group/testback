import {getPagePrefixByType, createUrl} from '../../../lib/links';


describe('getPagePrefixByType', () => {
  it('if a type in the allLinks map - should return locale with local prefix', () => {
    expect(getPagePrefixByType('sector', 'de')).toEqual('/de/sektoren');
    expect(getPagePrefixByType('sector', 'en')).toEqual('/en/sectors');
    expect(getPagePrefixByType('sector', 'fr')).toEqual('/fr/secteurs');

    expect(getPagePrefixByType('valueCalculator', 'en')).toEqual('/en/questionnaires');
    expect(getPagePrefixByType('valueCalculator', 'de')).toEqual('/de/fragenkatalog');
  });

  it('if a type isnt in the allLinks map - should return a locale prefix', () => {
    expect(getPagePrefixByType('page', 'de')).toEqual('/de');
    expect(getPagePrefixByType('page', 'en')).toEqual('/en');
  });
});

describe('createUrl should generates URL according to props', () => {
  beforeEach(() => {
    Object.assign(process.env, {
      NEXT_PUBLIC_BASE_URL: 'https://zumera.test'
    });
  });

  it('createUrl should create correct urls for a page', () => {
    expect(createUrl({
      type: 'page',
      locale: 'en',
      slug: 'about-our-team'
    })).toEqual('/en/about-our-team/');

    expect(createUrl({
      type: 'page',
      locale: 'fr',
      slug: 'some-frehcn-slug',
      isAbsolute: true
    })).toEqual('https://zumera.test/fr/some-frehcn-slug/');
  });

  it('createUrl should create correct urls for other essences', () => {
    expect(createUrl({
      type: 'employee',
      locale: 'de',
      slug: 'jack-daniel'
    })).toEqual('/de/mitarbeiter/jack-daniel/');

    expect(createUrl({
      type: 'employee',
      locale: 'de',
      slug: 'jack-daniel',
      isAbsolute: true
    })).toEqual('https://zumera.test/de/mitarbeiter/jack-daniel/');
  });
});