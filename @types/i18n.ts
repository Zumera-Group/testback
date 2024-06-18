export interface IAlternateLangHrefs {
  [lang: string]: string
}

export interface ILangRef {
  _id: string;
  _lang: string;
  slug: {
    current: string
  },
  hidePage?: boolean;
}

export interface I18nBase {
  _id: string;
  _lang: string;
  slug: {
    current: string;
  };
  _langRefs?: ILangRef[];
  hidePage?: boolean;
}