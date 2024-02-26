import { SanityNumberValueType } from '../../../../../../@types/modules';

export const DEFAULT_VALUES: {
  valueType: SanityNumberValueType;
  salesforceFormat: 'number' | 'date_year' | 'date_month' | 'date_day';
  placeholder: string;
  label: string;
} = {
  valueType: 'number',
  salesforceFormat: 'number',
  placeholder: '',
  label: '',
};

