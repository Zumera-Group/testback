import { useEffect, useState } from 'react';
import { Office } from '../../../../offices/domain/index';

export const useGlobalNetwork = (offices: Office[]) => {
  const [continents, setContinents] = useState<string[]>([]);
  const [continentsWithCDIOffices, setContinentsWithCDIOffices] = useState<
    Record<string, Office[]>
  >({});
  const sorter = (data: any[], propToSort?: string): any[] => {
    return data.sort((a, b) => {
      if (typeof a === 'string') {
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
      } else if (a[propToSort]) {
        if (a[propToSort].toLowerCase() < b[propToSort].toLowerCase())
          return -1;
        if (a[propToSort].toLowerCase() > b[propToSort].toLowerCase()) return 1;
        return 0;
      }
    });
  };
  useEffect(() => {
    const cdiOffices = offices?.filter((o) => o.isCDINetwork);
    const sortedCDIOffices = getSortedOffices(cdiOffices);

    const getContinentsWithCDIOffices = sortedCDIOffices?.reduce(
      (accC, currO) => {
        const continent = currO.continentName?.name;
        if (continent) {
          if (accC[continent]) {
            accC[continent].push(currO);
          } else {
            accC = { ...accC, [continent]: [currO] };
          }
        }
        return accC;
      },
      {},
    );

    setContinents(getSortedContinents(sortedCDIOffices));
    setContinentsWithCDIOffices(getContinentsWithCDIOffices);
  }, [offices]);

  const getSortedContinents = (offices: Office[]): string[] => {
    const continents: string[] = [];
    offices?.forEach((o) => {
      const continent = o.continentName?.name;
      if (continent && !continents.includes(continent)) {
        continents.push(continent);
      }
    });
    return sorter(continents);
  };

  const getSortedOffices = (offices: Office[]) => {
    return offices && sorter(offices, 'city');
  };

  return {
    continents,
    continentsWithCDIOffices,
  };
};
