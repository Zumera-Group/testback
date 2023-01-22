import React from 'react';
import { Office } from '../domain/index';
import { OfficeCDIHero as OfficeCDIHeroComponent } from 'components/OfficeCDI';

export const OfficeCDIHero: React.FC<{
  office: Office;
  subtitle: string;
}> = ({ office, subtitle }) => {
  return <OfficeCDIHeroComponent office={office} subtitle={subtitle} />;
};
