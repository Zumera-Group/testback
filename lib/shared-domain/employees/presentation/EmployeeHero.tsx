import React from 'react';

import backgroundImage from '../../../../public/sectorDetail/hero-bg.png';
import { Box, FlexCol } from 'components/Layout/Flex/Flex';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { getTranslateByScope } from 'translation/i18n';
import { HEADER_HEIGHT } from '../../page/constants';
import Image from 'next/image';

import { TitleWithSubtitleAndDescription } from '../../page/presentation/components/TitleWithSubtitleAndDescription';
import { colors } from 'styles/foundations/colors';
import { fontSizes, fontWeights } from 'styles/foundations/fontStyles';
import { P } from 'components/Typography/P';
import { SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { getEmployeeFullName } from 'lib/shared-domain/employees/domain/getEmployeeFullName';
import { Employee } from '../domain/index';
import { sanityImageUrlFor } from '../../../sanity';

const t = getTranslateByScope('website.employeeDetails.hero');

const TitleWithText: React.FC<{
  title: string;
  text: string;
}> = ({ title, text }) => {
  return (
    <FlexCol mb={4} flexBasis="30%">
      <P
        mb={2}
        fontSize={fontSizes.small}
        color={colors.primary.darkGreen}
        fontWeight={fontWeights.bold}
      >
        {title}
      </P>
      <P>{text}</P>
    </FlexCol>
  );
};

export const EmployeeHero: React.FC<{ employee: Employee; content: any }> = ({
  employee,
  content,
}) => {
  const comaSeparatedSectors = employee?.sectors?.map((s) => {
    return s.name;
  });
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;

  return (
    <FlexCol
      width="100%"
      minHeight="841px"
      justifyContent="center"
      backgroundImage={`url(${backgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment={!isMobile && 'fixed'}
      position="relative"
    >
      <SectionContainer py="md">
        <Box mt={HEADER_HEIGHT}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
            <Box mt={3}>
              <TitleWithSubtitleAndDescription
                title={getEmployeeFullName(employee)}
                description={employee.jobTitle}
                color={{ description: colors.black }}
                fontSizeDescription="24px"
                headingType="h1"
              />

              <Box mt={6}>
                <>
                  {comaSeparatedSectors && (
                    <TitleWithText
                      title={content?.sectorTitle}
                      text={comaSeparatedSectors.join(' - ')}
                    />
                  )}
                  {employee.office && (
                    <TitleWithText
                      title={content?.officeTitle}
                      text={employee.office?.city}
                    />
                  )}
                </>
              </Box>
            </Box>
            <Box position="relative">
              {employee.detailPagePicture?.picture?.asset?.url && (
                <Box width="100%" height="600px">
                  <Image
                    unoptimized
                    src={sanityImageUrlFor(
                      employee.detailPagePicture?.picture?.asset?.url,
                    ).url()}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    objectFit="cover"
                    layout="fill"
                  />
                </Box>
              )}
            </Box>
          </SimpleGrid>
        </Box>
      </SectionContainer>
    </FlexCol>
  );
};
