import { Box } from 'components/Layout/Flex/Flex';
import React from 'react';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { SimpleGrid } from '@chakra-ui/react';
import {
  EmployeeCard,
  PartnerCard,
} from '../../employees/presentation/EmployeeCard';
import { Employee } from '../../employees/domain/index';
import { Partner } from '../domain/index';
import { Description } from '../../page/domain/index';

export const NewsArticleTeam: React.FC<{
  employees?: Employee[];
  partnerSection?: {
    subtitle: string;
    title: string;
    description: Description[];
    partners: Partner[];
  };
  content?: any;
}> = ({ employees, content, partnerSection }) => {
  const t = (item) => content?.[item];
  const noPartners = !partnerSection || partnerSection?.partners?.length === 0;
  const noEmployees = !employees || employees.length === 0;

  if (noPartners && noEmployees) return null;

  const renderPartnerOrEmployee = () => {
    if (noEmployees && !noPartners) {
      return partnerSection?.partners?.map((p, index) => (
        <PartnerCard partner={p} key={index} />
      ));
    } else {
      if(!noEmployees) {
        return employees.map((p, index) => (
            <EmployeeCard linkText={content?.linkText} employee={p} key={index}/>
        ));
      }

      return null;
    }
  };

  return (
    <SectionContainer pt="md" pb="md">
      <Box width="95%">
        <TitleWithSubtitleAndDescription
          description={content?.description || partnerSection?.description}
          title={content?.title || partnerSection?.title}
          subtitle={content?.subtitle || partnerSection?.subtitle}
        />
      </Box>
      <SimpleGrid mt={8} columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
        {renderPartnerOrEmployee()}
      </SimpleGrid>
    </SectionContainer>
  );
};
