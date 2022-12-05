import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OfficeFacade } from '../infrastructure/office.facade';

export const fetchOffices = async (locale: Locale) => {
  const facade = new OfficeFacade();

  return await facade.getOffices(locale);
};

export const fetchOffice = async (
  locale: Locale,
  id: string,
  preview: boolean,
) => {
  const facade = new OfficeFacade();

  return await facade.getOffice(locale, id, preview);
};

export const useFetchOffices = () => {
  const router = useRouter();
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchOffices(router.locale as any).then((t) => {
        setOffices(t);
      });
    }
  }, []);

  return offices;
};
