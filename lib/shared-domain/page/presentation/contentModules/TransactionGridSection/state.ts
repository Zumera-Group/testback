import { Sector } from 'lib/shared-domain/page/domain';
import create from 'zustand';

export const useSelectSector = create<any>(set => ({
  sector: null,
  selectSector: (sector: Sector) => set(() => ({ sector: sector })),
}))