import { useEffect } from 'react';
import { EnvironmentService } from 'environment.service';
import I18n from 'i18n-js';

export function useSetQuestionnaireLocaleToUseFori18n(locale: string) {
  useEffect(() => {
    if (!EnvironmentService.isProduction()) return;
    if (locale === 'de') {
      I18n.locale = 'de';
    } else if (locale === 'fr') {
      I18n.locale = 'fr';
    } else {
      I18n.locale = 'en';
    }
  }, [locale]);
}
