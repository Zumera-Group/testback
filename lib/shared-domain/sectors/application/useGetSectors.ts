import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SectorFacade } from '../infrastructure/sector.facade';

export const fetchSectors = async (locale: Locale) => {
  const facade = new SectorFacade();

  return await facade.getSectors(locale);
};

export const useFetchSectors = () => {
  const router = useRouter();
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchSectors(router.locale as any).then((t) => {
        setSectors(t);
      });
    }
  }, []);

  return sectors;
};
