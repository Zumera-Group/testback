import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SectorFacade } from '../infrastructure/sector.facade';

export const fetchSectors = async (locale: Locale) => {
  const facade = new SectorFacade();

  return await facade.getSectors(locale);
};
