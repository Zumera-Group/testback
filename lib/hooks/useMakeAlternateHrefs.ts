import {ISanityDoc} from '../shared-domain/page/domain';
import {useCallback, useMemo} from 'react';
import {IAlternateLangHrefs, ILangRef} from '../../@types/i18n';
import {SanityService} from '../services/sanity.service';

export const useMakeAlternateHrefs = ({ doc, urlPrefixes = null }: { doc: ISanityDoc, urlPrefixes?: ILangPrefixes|null }) => {
  const makeAlternates = useCallback((lang: string, langRefs: ILangRef[]) => {
    const alternates: IAlternateLangHrefs = {};

    for (const { _lang, slug } of langRefs) {
      if (lang != _lang && slug) {
        const siteLocale = SanityService.getLocaleFromSanityLocale(_lang);

        let href = `/${siteLocale}`;
        if (urlPrefixes && urlPrefixes[siteLocale]) {
          href += `${urlPrefixes[siteLocale]}`;
        }
        href += `/${slug.current}`;
        // if (page._type == 'landings') {
        //   href = `/${siteLocale}/landing/${slug.current}`;
        // } else {
        //   href = `/${siteLocale}/${slug.current}`;
        // }

        Object.assign(alternates, {
          [siteLocale]: href,
        });
      }
    }

    return alternates;
  }, [urlPrefixes]);

  const alternateHrefs = useMemo(() => {
    if (doc.__i18n_base && Array.isArray(doc.__i18n_base._langRefs) && doc._lang) {
      const langRefs: ILangRef[] = doc.__i18n_base._langRefs.filter(
        (ref) => ref !== null,
      );

      langRefs.push({
        _id: doc.__i18n_base._id,
        _lang: doc.__i18n_base._lang,
        slug: doc.__i18n_base.slug,
      });

      return makeAlternates(doc._lang, langRefs);
    } else if (Array.isArray(doc._langRefs) && doc._langRefs[0] !== null && doc._lang) {
      const langRefs = doc._langRefs.filter((ref) => ref !== null);
      return makeAlternates(doc._lang, langRefs);
    }

    return {};
  }, [doc, makeAlternates]);

  return { alternateHrefs };
};

interface ILangPrefixes {
  [lang: string]: string
}
