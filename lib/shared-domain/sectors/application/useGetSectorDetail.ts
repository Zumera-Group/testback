import { Locale } from 'lib/locale';
import { SectorFacade } from '../infrastructure/sector.facade';

export const fetchSectorDetail = async (
  locale: Locale,
  slug: string,
  preview?: boolean,
) => {
  const facade = new SectorFacade();

  return await facade.getSectorDetail(locale, slug, preview);
};

export const fetchSectorDetailContent = async (locale: Locale) => {
  const facade = new SectorFacade();

  return await facade.getSectorDetailContent(locale);
};

export const useGetSectorDetail = async (locale: Locale, slug: string) => {
  const sectorDetail = await fetchSectorDetail(locale, slug);

  return { sectorDetail };
};
