import { Locale } from 'lib/locale';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Employee } from '../domain';
import { EmployeeFacade } from '../infrastructure/employee.facade';

export const fetchEmployees = async (locale: Locale) => {
  const facade = new EmployeeFacade();

  return await facade.getEmployees(locale);
};

export const useFetchEmployees = () => {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchEmployees(router.locale as any).then((t) => {
        setEmployees(t);
      });
    }
  }, []);

  return employees;
};
