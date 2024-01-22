export interface IAlternateLangHrefs {
  [lang: string]: string
}

export interface ILangRef {
  _id: string;
  _lang: string;
  slug: {
    current: string
  }
}