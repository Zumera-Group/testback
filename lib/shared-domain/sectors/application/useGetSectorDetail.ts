import { Locale } from 'lib/locale';
import { SectorFacade } from '../infrastructure/sector.facade';
import { useEffect, useState } from 'react';

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

export const useGetSectorDetail = (locale: Locale, slug: string) => {
  const [sector, setSector] = useState({
    graphLight: {
      iconImage: {
        asset: { url: '', extension: '' },
      },
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const { sectorDetail } = await fetchSectorDetail(locale, slug);
      setSector(sectorDetail as any);
    };
    fetchData().catch(console.error);
  }, []);

  return sector;
};
