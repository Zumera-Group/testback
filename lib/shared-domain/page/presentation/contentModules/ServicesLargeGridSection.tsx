import React from 'react';

import { ServicesLargeGridSectionModule } from '../../domain/contentModule';

import ServicesLargeGrid from 'components/ServicesLargeGrid';

export const ServicesLargeGridSection: React.FC<{
  specificContentModule: ServicesLargeGridSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <ServicesLargeGrid {...specificContentModule} />
  );
};

export default ServicesLargeGridSection;
