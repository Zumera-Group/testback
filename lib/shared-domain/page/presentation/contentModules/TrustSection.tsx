import React from 'react';

import { TrustSectionModule } from '../../domain/contentModule';

import Trust from 'components/Trust';

export const TrustSection: React.FC<{
  specificContentModule: TrustSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <Trust isResultsCompactOnMobile={false} {...specificContentModule} />
  );
};

export default TrustSection;
