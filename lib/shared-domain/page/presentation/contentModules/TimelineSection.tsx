import React from 'react';

import { TimelineSectionModule } from '../../domain/contentModule';

import TimelineSectionComponent from 'components/TimelineSection';

export const TimelineSection: React.FC<{
  specificContentModule: TimelineSectionModule;
}> = ({ specificContentModule }) => {
  return <TimelineSectionComponent {...specificContentModule} />;
};

export default TimelineSection;
