import React from 'react';

import BigMenu from './BigMenu';
import {AnimatePresence} from 'framer-motion';
import {Logo} from '../../Logo';
import {SiteSettings} from '../../../lib/shared-domain/page/domain';
import {IAlternateLangHrefs} from '../../../@types/i18n';

export default function BigMenuWrapper({
  bigMenuOpen,
  setBigMenuOpen,
  siteSettings,
  langAlternates,
  services,
  sectors,
  blogArticles,
  homeSlug,
  siteName
}: IProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      {bigMenuOpen && (
        <BigMenu
          siteSettings={siteSettings}
          services={services}
          sectors={sectors}
          blogArticles={blogArticles}
          logo={<Logo slug={homeSlug} title={siteName} isAnimated={true} />}
          closeBigMenu={() => setBigMenuOpen(false)}
          langAlternates={langAlternates}
        />
      )}
    </AnimatePresence>
  );
}

interface IProps {
  bigMenuOpen: boolean;
  setBigMenuOpen: (val: boolean) => void;
  siteSettings: SiteSettings;
  langAlternates?: IAlternateLangHrefs;
  services: any;
  sectors: any;
  blogArticles: any;
  homeSlug: string;
  siteName: string;
}