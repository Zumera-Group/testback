import React from 'react';

import { AllTransactionsCarouselSectionModule } from '../../domain/contentModule';

import AllTransactionsCarousel from 'components/AllTransactionsCarousel';

export const AllTransactionsCarouselSection: React.FC<{
  specificContentModule: AllTransactionsCarouselSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <AllTransactionsCarousel {...specificContentModule} />
  );
};

export default AllTransactionsCarouselSection;
