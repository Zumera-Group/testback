import React from 'react';
import Link from 'next/link';

import { Box, FlexCol, FlexRow } from 'components/Layout/Flex/Flex';
import { ServicesLargeGridSectionModule } from '../../domain/contentModule';
import { TitleWithSubtitleAndDescription } from '../components/TitleWithSubtitleAndDescription';
import { Grid, GridItem } from '@chakra-ui/react';

import { colors } from '../../../../../styles/foundations/colors';
import { icons } from '../../../../../components/Icons/index';
import { LinkWithArrow } from '../components/LinkWithArrow';
import { P } from '../../../../../components/Typography/P';
import { H } from '../../../../../components/Typography/H';
import { fontSizes } from '../../../../../styles/foundations/fontStyles';
import { Service } from '../../domain/index';
import { useHover } from '../../../../hooks/useOnHover';
import { SectionContainer } from 'components/Layout/SectionContainer';
import { links } from 'lib/links';

const Card: React.FC<{
  service: Service;
  specificContentModule: ServicesLargeGridSectionModule;
}> = ({ service, specificContentModule }) => {
  const [ref, isHovered] = useHover();

  return (
    <>
      {service && (
        <>
          <GridItem>
            <Link passHref href={links().services(service)}>
              <Box
                height="100%"
                display="block"
                as="a"
                ref={ref}
                cursor="pointer"
                py={4}
                borderTopStyle="solid"
                borderTopColor={colors.black}
                borderTopWidth="2px"
              >
                <FlexCol height="100%">
                  <FlexCol justifyContent="space-between">
                    <FlexRow justifyContent="space-between">
                      <H
                        color={
                          isHovered ? colors.primary.lightGreen : colors.black
                        }
                        fontSize={fontSizes.h2}
                        noOfLines={2}
                      >
                        {service.name}
                      </H>
                      <Box
                        height="fit-content"
                        transition=".2s ease-in all"
                        transformOrigin="center"
                        transform={
                          isHovered ? 'rotate(90deg)' : 'rotate(45deg)'
                        }
                      >
                        <icons.BurgerOpen color={colors.black} />
                      </Box>
                    </FlexRow>
                    <P height="72px" noOfLines={3} mt={2} mb={2}>
                      {service.shortDescription}
                    </P>
                  </FlexCol>
                  <FlexCol flex={1} justifyContent="flex-end">
                    <Box>
                      <LinkWithArrow
                        color={
                          isHovered ? colors.primary.lightGreen : colors.black
                        }
                        href={links().services(service)}
                        title={specificContentModule.linkText}
                      />
                    </Box>
                  </FlexCol>
                </FlexCol>
              </Box>
            </Link>
          </GridItem>
        </>
      )}
    </>
  );
};

export const ServicesLargeGridSection: React.FC<{
  specificContentModule: ServicesLargeGridSectionModule;
}> = ({ specificContentModule }) => {
  return (
    <SectionContainer py="md">
      <Box mb={8} width={{ base: '100%', lg: '50%' }}>
        <TitleWithSubtitleAndDescription {...specificContentModule} />
      </Box>
      <Grid
        templateColumns={{
          base: 'repeat(auto-fit, minmax(300px, 1fr))',
          xl: 'repeat(3, minmax(300px, 1fr))',
        }}
        gap={4}
      >
        {specificContentModule.services?.map((s, index) => (
          <Card
            key={index}
            service={s}
            specificContentModule={specificContentModule}
          />
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default ServicesLargeGridSection;
