import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useValuationStore } from 'lib/shared-domain/questionnaire/store';
import { CurrencySymbols } from 'lib/shared-domain/salesforce/application/exchangeRate';
import { SanityNumberValueType } from '../../../../@types/modules';

export enum SIGNS {
  EUR = '€',
  USD = '$',
  percent = '%',
}

export const useNumberFormat = (valueType: SanityNumberValueType) => {
  const [sign, setSign] = useState(SIGNS[valueType] ?? null);
  const router = useRouter();
  const locale = router?.locale;
  const { getAnswer } = useValuationStore();

  const isCurrency = valueType === 'EUR' || valueType === 'USD' || valueType === 'currency';
  const getFormatOptions = () => {
    if (isCurrency) {
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
      valueType !== 'currency' &&
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
    const currency = getAnswer('Currency__c');

    if (CurrencySymbols[currency] && isCurrency) {
      setSign(CurrencySymbols[currency]);
      return;
    }

    setSign(SIGNS[valueType] ?? null);
  }, [valueType, getAnswer, isCurrency]);

  return {
    getNumberFormat,
    sign,
  };
};
