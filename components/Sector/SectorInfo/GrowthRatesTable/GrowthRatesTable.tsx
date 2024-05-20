import { useEffect, useState } from 'react';

import Trust from 'components/Trust';

import styles from './GrowthRatesTable.module.scss';


interface GrowthRatesTableProps {
  title: string;
  growthRatesTable: any;
  isResultsCompactOnMobile?: boolean;
}

export const GrowthRatesTable = ({
  title,
  growthRatesTable,
  isResultsCompactOnMobile,
}: GrowthRatesTableProps) => {

  const [formatted, setFormatted] = useState([]);
  const growthRates = growthRatesTable?.growthRates || null;

  // Swap the title + subtitle for correct statistic animation
  useEffect(() => {
    const growthRatesFormatted = growthRates?.map((item) => {
      [item['title'], item['subtitle']] = [item['subtitle'], item['title']];
      return item;
    });

    setFormatted(growthRatesFormatted);
  }, [growthRates]);

  if (!growthRates) return null;

  return (
    <>
      {title && <h3 className={styles.title}>{title}</h3>}
      {formatted.length > 0 && (
        <Trust
          isResultsCompactOnMobile={isResultsCompactOnMobile}
          textElements={formatted}
        />
      )}
    </>
  );
};

export default GrowthRatesTable;
