import React from 'react';

import { CDIGlobalSectionModule } from '../../domain/contentModule';

import CDIGlobal from 'components/CDIGlobal';

export const CDIGlobalSection: React.FC<{
  specificContentModule: CDIGlobalSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <CDIGlobal {...specificContentModule} />
  );
};

export default CDIGlobalSection;