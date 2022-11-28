import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ServiceFacade } from '../infrastructure/service.facade';

export const fetchServices = async (locale: Locale) => {
  const facade = new ServiceFacade();

  return await facade.getServices(locale);
};

export const useFetchServices = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchServices(router.locale as any).then((t) => {
        setServices(t);
      });
    }
  }, []);

  return services;
};
