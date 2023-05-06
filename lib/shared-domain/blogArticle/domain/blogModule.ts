import { Transaction } from 'lib/shared-domain/transactions/domain';
// import { Fact, TitleAndDescriptionItem } from '.';
// import { Sector, Service, Description, IndustryReport } from './index';
// import { Office } from 'lib/shared-domain/offices/domain/index';
// import { Employee } from 'lib/shared-domain/employees/domain';

export abstract class BaseModule {}

export type ContentModuleType = 'transactionQuote' | 'textBlock';

abstract class ContentModuleTypeFactory {
  static createInstance(type: ContentModuleType, fields: Record<string, any>) {
    if (type === 'transactionQuote') return new TransactionQuoteModule(fields);
    if (type === 'textBlock') return new TextBlockModule(fields);
  }
}

export class ContentModule {
  _key: string;
  specificContentModule: BaseModule;

  constructor(_key: string, specificContentModule: BaseModule) {
    this._key = _key;
    this.specificContentModule = specificContentModule;
  }

  static create(params: {
    _key: string;
    _type: ContentModuleType;
  }): ContentModule {
    return new ContentModule(
      params._key,
      ContentModuleTypeFactory.createInstance(params._type, params),
    );
  }
}

export class TransactionQuoteModule extends BaseModule {
  title: string;
  subtitle: string;
  quoteText: string;
  name: string;
  position: string;
  photo: any;
  transaction: Transaction;
  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.quoteText = fields.quoteText;
    this.position = fields.position;
    this.name = fields.name;
    this.photo = fields.photo;
    this.transaction = fields.transaction;
  }
}

export class TextBlockModule extends BaseModule {
  subheading: string;
  text: any[];

  constructor(fields: Record<string, any>) {
    super();
    this.subheading = fields.subheading;
    this.text = fields.text;
  }
}
