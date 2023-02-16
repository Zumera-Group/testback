import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export enum VALUE_TYPE {
  EUR = '€',
  USD = '$',
  percent = '%',
}

export const useNumberFormat = (
  valueType: 'number' | 'EUR' | 'USD' | 'year' | 'age' | 'percent',
): { sign: VALUE_TYPE; getNumberFormat: (arg: number) => string } => {
  const [sign, setSign] = useState(VALUE_TYPE[valueType] ?? null);
  const router = useRouter();
  const locale = router?.locale;

  const getFormatOptions = () => {
    if (valueType === 'EUR' || valueType === 'USD') {
      return {
        style: 'currency',
        currency: valueType,
        maximumFractionDigits: 0,
      };
    } else if (valueType === 'percent') {
      return {
        style: 'percent',
        maximumFractionDigits: 0,
      };
    } else return {};
  };

  const getNumberFormat = (number: number): string => {
    if (
      valueType !== 'EUR' &&
      valueType !== 'USD' &&
      valueType !== 'percent' &&
      valueType !== 'number'
    ) {
      return number.toString(10);
    } else if (valueType === 'percent') {
      return new Intl.NumberFormat(locale, getFormatOptions()).format(
        number / 100,
      );
    } else {
      return new Intl.NumberFormat(locale, getFormatOptions()).format(number);
    }
  };

  useEffect(() => {
    setSign(VALUE_TYPE[valueType] ?? null);
  }, [valueType]);

  return {
    getNumberFormat,
    sign,
  };
};
