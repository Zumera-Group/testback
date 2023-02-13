import { LandingsFacade } from 'lib/shared-domain/landings/infrastructure/landings.facade';

export const fetchLandings = async () => {
  const facade = new LandingsFacade();

  return await facade.getLandings();
};
