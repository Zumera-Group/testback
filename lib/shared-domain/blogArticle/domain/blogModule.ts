
export abstract class BaseModule {}

export type ContentModuleType =
  | 'textBlock'
  | 'imageBlock'
  | 'textImageParallaxBlock'
  | 'quoteBlock'
  | 'textStatsBlock'
  | 'fullWidthImageBlock'
  | 'videoBlock'
  | 'whiteInlinePaperFormBlock'
  | 'downloadPaperStickyFooter';

abstract class ContentModuleTypeFactory {
  static createInstance(type: ContentModuleType, fields: Record<string, any>) {
    if (type === 'textBlock') return new TextBlockModule(fields);
    if (type === 'imageBlock') return new ImageBlockModule(fields);
    if (type === 'textImageParallaxBlock')
      return new TextImageParallaxBlockModule(fields);
    if (type === 'quoteBlock') return new QuoteBlockModule(fields);
    if (type === 'textStatsBlock') return new TextStatsBlockModule(fields);
    if (type === 'fullWidthImageBlock')
      return new FullWidthImageBlockModule(fields);
    if (type === 'videoBlock') return new VideoBlockModule(fields);
    if (type === 'downloadPaperStickyFooter') return new DownloadPaperStickyFooterModule(fields);
    if (type === 'whiteInlinePaperFormBlock') return new WhitePaperInlineFormModule(fields);
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
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.subheading = fields.subheading;
    this.text = fields.text;
    this.anchor = fields.anchor;
  }
}

export class ImageBlockModule extends BaseModule {
  image: any;
  caption: string;
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.image = fields.image;
    this.caption = fields.caption;
    this.anchor = fields.anchor;
  }
}

export class TextImageParallaxBlockModule extends BaseModule {
  imageSection: {};
  textSection: any[];
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.imageSection = fields.imageSection;
    this.textSection = fields.textSection;
    this.anchor = fields.anchor;
  }
}

export class QuoteBlockModule extends BaseModule {
  quote: string;
  name: string;
  position: string;
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.quote = fields.quote;
    this.name = fields.name;
    this.position = fields.position;
    this.anchor = fields.anchor;
  }
}

export class TextStatsBlockModule extends BaseModule {
  subheading: string;
  text: any[];
  statistics: any;
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.subheading = fields.subheading;
    this.text = fields.text;
    this.statistics = fields.statistics;
    this.anchor = fields.anchor;
  }
}

export class FullWidthImageBlockModule extends BaseModule {
  image: any;
  caption: string;
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.image = fields.image;
    this.caption = fields.caption;
    this.anchor = fields.anchor;
  }
}

export class VideoBlockModule extends BaseModule {
  videoTitle: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  caption?: string;
  anchor?: string;

  constructor(fields: Record<string, any>) {
    super();
    this.videoTitle = fields.videoTitle;
    this.thumbnail = fields.thumbnail;
    this.videoUrl = fields.videoUrl;
    this.duration = fields.duration;
    this.caption = fields.caption;
    this.anchor = fields.anchor;
  }
}


export class DownloadPaperStickyFooterModule extends BaseModule {
  button: any;

  constructor(fields: Record<string, any>) {
    super();
    this.button = fields.button;
  }
}

export class WhitePaperInlineFormModule extends BaseModule {
  title: string;
  subtitle: string;
  image: any;
  pdfUrl: any;
  whitePaperFormFields: {
    downloadAgain: string;
    buttonText: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    successMessage: string;
    errorMessage: string;
  };

  constructor(fields: Record<string, any>) {
    super();
    this.title = fields.title;
    this.subtitle = fields.subtitle;
    this.image = fields.image;
    this.whitePaperFormFields = fields.whitePaperFormFields;
    this.pdfUrl = fields.pdfUrl;
  }
}
