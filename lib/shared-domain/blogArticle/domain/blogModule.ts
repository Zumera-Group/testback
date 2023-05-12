export abstract class BaseModule {}

export type ContentModuleType = 'textBlock' | 'imageBlock';

abstract class ContentModuleTypeFactory {
  static createInstance(type: ContentModuleType, fields: Record<string, any>) {
    if (type === 'textBlock') return new TextBlockModule(fields);
    if (type === 'imageBlock') return new ImageBlockModule(fields);
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

export class TextBlockModule extends BaseModule {
  subheading: string;
  text: any[];

  constructor(fields: Record<string, any>) {
    super();
    this.subheading = fields.subheading;
    this.text = fields.text;
  }
}

export class ImageBlockModule extends BaseModule {
  image: any;
  caption: any[];

  constructor(fields: Record<string, any>) {
    super();
    this.image = fields.image;
    this.caption = fields.caption;
  }
}
