import I18n from 'i18n-js';
import { EnvironmentService } from '../environment.service';

import zu from './zu.json';
import de from './de.json';
import en from './en.json';
import fr from './fr.json';

const DEVELOPMENT_LANGUAGE = 'zu';

I18n.fallbacks = true;
I18n.translations = {
  zu,
  de,
  en,
  fr,
};

I18n.missingTranslation = function (scope, options) {
  const fallbackText = scope?.split?.('.')?.reverse?.()?.[0] || scope;
  return 'm:' + fallbackText;
};

if (!EnvironmentService.isProduction()) {
  I18n.locale = DEVELOPMENT_LANGUAGE;
}

if (EnvironmentService.isProduction()) {
  I18n.locales.de = ['de', 'zu'];
  I18n.locales.en = ['en', 'zu'];
  I18n.locales.fr = ['fr', 'zu'];
  I18n.locale = 'de';
}

const getTranslation = (scope: string, path: string, params?: any) =>
  I18n.t(`${scope}.${path}`, params);

export const getTranslateByScope =
  (scope: string) => (key: string, params?: any) => {
    if (!scope) {
      return '';
    }

    return getTranslation(scope, key, params);
  };

export const globalTranslate = I18n;
