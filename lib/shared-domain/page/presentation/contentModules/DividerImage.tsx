import React from 'react';

import { DividerImageModule } from '../../domain/contentModule';

import DividerImageComponent  from 'components/DividerImage';

export const DividerImage: React.FC<{
  specificContentModule: DividerImageModule;
}> = ({ specificContentModule }) => {
  const dividerImage = specificContentModule.getImageUrl();
  return (
    <DividerImageComponent
      {...specificContentModule}
      dividerImage={dividerImage}
    />
  );
};

export default DividerImage;
