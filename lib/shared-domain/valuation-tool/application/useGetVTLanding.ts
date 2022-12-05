import { Locale } from 'lib/locale';
import { ValuationToolFacade } from '../infrastructure/valuationTool.facade';
import { VTLanding } from '../domain/index';

export const fetchValuationToolLanding = async (
  locale: Locale,
  slug: string,
  params?: boolean,
): Promise<{ landing: VTLanding; query: string }> => {
  const facade = new ValuationToolFacade();

  return await facade.getLanding(locale, slug, params);
};

export const useGetVTLanding = async (
  locale: Locale,
  slug: string,
): Promise<{ landing: VTLanding; query: string }> => {
  const { landing, query } = await fetchValuationToolLanding(locale, slug);

  return { landing, query };
};
