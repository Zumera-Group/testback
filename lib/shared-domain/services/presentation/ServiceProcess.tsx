import { SectionContainer } from 'components/Layout/SectionContainer';
import React from 'react';
import { Box, Hide, SimpleGrid } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { getTranslateByScope } from 'translation/i18n';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import Image from 'next/image';
import { P } from 'components/Typography/P';
import { fontWeights } from '../../../../styles/foundations/fontStyles';
import { H } from '../../../../components/Typography/H';
import { ServiceProcessData } from '../../page/domain/index';

const t = getTranslateByScope('website.serviceDetails.process');

const NumberWithText: React.FC<{ number: number; text: string }> = ({
  number,
  text,
}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const variant = isMobile ? 'mobileWebsiteH1' : 'websiteH1';

  return (
    <Box mb={4}>
      <H variant={variant} fontWeight={fontWeights.bold} mb={1}>
        {number}
      </H>
      <P>{text}</P>
    </Box>
  );
};

export const ServiceProcess: React.FC<{ process: ServiceProcessData | any }> =
  ({ process }) => {
    return (
      <SectionContainer py="md">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          <Box>
            <TitleWithSubtitleAndDescription
              description={process?.description}
              title={process?.title}
              subtitle={process?.subtitle}
            />

            <Hide below="md">
              <Box
                mt={8}
                position="relative"
                height={{ base: '400px', lg: '450px' }}
              >
                {process?.graph?.asset?.url && (
                  <Image
                    unoptimized
                    loading="lazy"
                    objectFit="contain"
                    layout="fill"
                    alt={t('title')}
                    src={process.graph.asset.url}
                  />
                )}
              </Box>
            </Hide>
          </Box>
          <Box mt={{ base: 0, md: 6 }}>
            {process?.steps.map((s, i) => (
              <NumberWithText key={i} number={i + 1} text={s} />
            ))}
          </Box>
        </SimpleGrid>
      </SectionContainer>
    );
  };
