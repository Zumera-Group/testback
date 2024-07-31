import { Locale } from 'lib/locale';
import { SectorFacade } from '../infrastructure/sector.facade';

export const fetchSectors = async (locale: Locale, isNoah: boolean = false) => {
  const facade = new SectorFacade();

  return await facade.getSectors(locale, isNoah);
};
