import React from 'react';
import Image from 'next/image';
import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { SectionContainer } from '../../../../components/Layout/SectionContainer';
import { TitleWithSubtitleAndDescription } from 'lib/shared-domain/page/presentation/components/TitleWithSubtitleAndDescription';
import { getTranslateByScope } from 'translation/i18n';
import { SimpleGrid, Flex } from '@chakra-ui/react';
import { BiggerEmployeeCard } from '../../employees/presentation/EmployeeCard';
import { Sector } from '../../page/domain/index';
import quotes from '../../../../public/contentModules/howCoolSection/quotes.svg';
import { P } from '../../../../components/Typography/P';
import { colors } from '../../../../styles/foundations/colors';
import { FlexCol } from '../../../../components/Layout/Flex/Flex';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

const t = getTranslateByScope('website.sectorDetails.team');

export const SectorTeam: React.FC<{ sector: Sector }> = ({ sector }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  if (
    !sector.contributors ||
    sector.contributors.length === 0 ||
    !sector.teamSection
  )
    return null;

  return (
    <SectionContainer py="md">
      <Box width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription
          description={sector.teamSection.description}
          title={sector.teamSection.title}
          subtitle={sector.teamSection.subtitle}
        />
      </Box>
      <SimpleGrid mt={8} columns={isMobile ? 1 : 2} spacing={4}>
        {sector.contributors?.map((p, index) => (
          <>
            <FlexCol minHeight="520px" key={index}>
              <BiggerEmployeeCard
                linkText={sector.teamSection?.linkText || t('linkText')}
                employee={p}
              />
            </FlexCol>
            {index === 0 && sector.teamSection ? (
              <FlexCol
                bg={colors.white}
                py={6}
                px={isMobile ? 5 : 8}
                mt={isMobile ? 4 : 0}
                justify="flex-start"
                border="1px solid black"
              >
                <FlexRow mr={1} mb={4} height="80px">
                  <Image unoptimized
                    loading="lazy"
                    src={quotes}
                    alt=""
                    height="80px"
                    width="100px"
                  />
                </FlexRow>
                <P
                  variant="howCoolQuoteP"
                  color={colors.text.light}
                  mb={isMobile ? 3 : 4}
                >
                  {sector.teamSection.quote}
                </P>
                <Box mt={5}>
                  <P
                    variant="globalNetworkOfficeItemTitle"
                    mb={1}
                  >{`${sector.teamSection.author?.firstName} ${sector.teamSection.author?.lastName}`}</P>
                  <P color={colors.text.light}>
                    {sector.teamSection.author?.jobTitle}
                  </P>
                </Box>
              </FlexCol>
            ) : null}
          </>
        ))}
      </SimpleGrid>
    </SectionContainer>
  );
};
