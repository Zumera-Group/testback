import { Locale } from 'lib/locale';
import { JobsFacade } from '../infrastructure/jobs.facade';

export const fetchJobs = async (locale: Locale) => {
  const facade = new JobsFacade();

  return await facade.getJobs(locale);
};
