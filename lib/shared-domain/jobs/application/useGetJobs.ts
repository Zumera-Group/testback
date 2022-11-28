import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Job } from '../domain';
import { JobsFacade } from '../infrastructure/jobs.facade';

export const fetchJobs = async (locale: Locale) => {
  const facade = new JobsFacade();

  return await facade.getJobs(locale);
};

export const useFetchJobs = (): Job[] => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchJobs(router.locale as any).then((t) => {
        setJobs(t);
      });
    }
  }, []);

  return jobs;
};
