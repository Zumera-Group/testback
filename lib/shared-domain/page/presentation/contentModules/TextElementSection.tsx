import React from 'react';

import { TextElementSectionModule } from '../../domain/contentModule';

import TextElement from 'components/TextElement';

export const TextElementSection: React.FC<{
  specificContentModule: TextElementSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <TextElement {...specificContentModule} />
  );
};

export default TextElementSection;
