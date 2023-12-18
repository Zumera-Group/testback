import { useState, useEffect } from 'react';

import Trust from 'components/Trust';

import styles from './GrowthRatesTable.module.scss';

export const GrowthRatesTable = ({ title, growthRatesTable }) => {
  const [formatted, setFormatted] = useState([]);
  const { growthRates } = growthRatesTable;

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
      {formatted.length > 0 && <Trust textElements={formatted} />}
    </>
  );
};

export default GrowthRatesTable;
