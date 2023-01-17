import React from 'react';

import { SiteSettings, ServiceSectorsSection } from '../../page/domain/index';

import ServiceSectorsComponent from 'components/ServiceSectors';

export const ServiceSectors: React.FC<{
  section: ServiceSectorsSection | any;
  siteSettings: SiteSettings;
  customHref?: string;
}> = ({ section, siteSettings, customHref }) => {
  if (section?.sectors?.length === 0) return null;

  return (
    <ServiceSectorsComponent
      {...section}
      {...siteSettings}
      customHref={customHref}
    />
  );
};
