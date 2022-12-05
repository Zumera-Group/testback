import { ValuationToolFacade } from '../infrastructure/valuationTool.facade';

export const fetchLandings = async () => {
  const facade = new ValuationToolFacade();

  return await facade.getLandings();
};

export const useGetLandings = async () => {
  const landings = await fetchLandings();

  return { landings };
};
