import React from 'react';
import { LogosWithHeadlineSectionModule } from '../../domain/contentModule';
import { SectionContainer } from '../../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { colors } from '../../../../../styles/foundations/colors';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import Image from 'next/image';
import { Box } from '../../../../../components/Layout/Flex/Flex';

export const LogosWithHeadlineSection: React.FC<{
  specificContentModule: LogosWithHeadlineSectionModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <SectionContainer pt="md" pb={isMobile ? 'xs' : 'md'}>
      <Box w={{ base: '100%', lg: '65%' }}>
        <TitleWithSubtitleAndDescription
          title={specificContentModule.title}
          subtitle={specificContentModule.subtitle}
          description={specificContentModule.description}
          color={{
            title: colors.text.darker,
            subtitle: colors.text.light,
            description: colors.text.light,
          }}
        />
      </Box>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        mt={5}
        justify={{ base: 'center', lg: 'space-around' }}
      >
        {specificContentModule.logos?.map((l, i) =>
          l.asset?.url ? (
            <Image unoptimized
              loading="lazy"
              key={i}
              src={l.asset?.url}
              alt=""
              height={l.asset?.metadata?.dimensions?.height}
              width={l.asset?.metadata?.dimensions?.width}
            />
          ) : null,
        )}
      </Flex>
    </SectionContainer>
  );
};

export default LogosWithHeadlineSection;