import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { SectionContainer } from 'components/Layout/SectionContainer';
import React from 'react';

import { SectorCard } from 'lib/shared-domain/sectors/presentation/components/SectorCard';
import { LinkWithArrow } from 'lib/shared-domain/page/presentation/components/LinkWithArrow';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { SiteSettings, ServiceSectorsSection } from '../../page/domain/index';

export const ServiceSectors: React.FC<{
  section: ServiceSectorsSection | any;
  siteSettings: SiteSettings;
}> = ({ section, siteSettings }) => {
  if (section?.sectors?.length === 0) return null;

  return (
    <SectionContainer py="md">
      <Box mb={8} width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription
          description={section.description}
          title={section.title}
          subtitle={section.subtitle}
        />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 3 }} spacing={3}>
        {section.sectors?.map((s, index) => (
          <SectorCard key={index} index={index} sector={s} />
        ))}
      </SimpleGrid>
      {siteSettings?.sectorsOverviewPage?.slug?.current && (
        <Flex justify="center" align="center" mt={{ base: 4, md: 7 }}>
          <LinkWithArrow
            title={section.linkText}
            href={siteSettings?.sectorsOverviewPage?.slug?.current}
          />
        </Flex>
      )}
    </SectionContainer>
  );
};
