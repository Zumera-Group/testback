export const DEFAULT_VALUES: {
  valueType: 'number' | 'EUR' | 'USD' | 'year' | 'age' | 'percent';
  salesforceFormat: 'number' | 'date_year' | 'date_month' | 'date_day';
  placeholder: string;
  label: string;
} = {
  valueType: 'number',
  salesforceFormat: 'number',
  placeholder: '',
  label: '',
};

export enum VALUE_TYPE {
  EUR = '€',
  USD = '$',
  percent = '%',
}
