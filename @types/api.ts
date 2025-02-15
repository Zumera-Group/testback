export enum TFieldKind {
  multipicklist = 'multipicklist',
  reference = 'reference',
  phone = 'phone',
  date = 'date',
  currency = 'currency',
  percent = 'percent',
  textarea = 'textarea',
  picklist = 'picklist',
  url = 'url',
  boolean = 'boolean',
  id = 'id',
  email = 'email',
  string = 'string',
  datetime = 'datetime',
  int = 'int',
  double = 'double',
  address = 'address',
}

export interface IApiField {
  name: string|null,
  label: string|null,
  inline_help_text: string|null,
  type: TFieldKind|null,
  length: number|null,
  pickList: IApiFieldPickItem[]
}

export interface IApiFieldPickItem {
  label: string;
  value: string;
}

export interface ILeadEntryScore {
  points: number,
  percentage: number,
  calendly: string,
  avg: number,
  company_ev: {
    avg: number|null,
    max: number|null,
    min: number|null,
  }
}