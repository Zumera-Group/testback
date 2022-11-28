export const DEFAULT_SLIDER_VALUES: {
  from: number;
  to: number;
  gap: number;
  valueType: 'number' | 'EUR' | 'USD' | 'year' | 'age' | 'percent';
  salesforceFormat: 'number' | 'date_year' | 'date_month' | 'date_day';
  subGaps: { to: number; gap: number }[];
} = {
  from: 0,
  to: 100,
  gap: 1,
  valueType: 'number',
  salesforceFormat: 'number',
  subGaps: [],
};

export enum VALUE_TYPE {
  EUR = '€',
  USD = '$',
  percent = '%',
}
