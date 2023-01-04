import { Box, Flex } from '@chakra-ui/react';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';
import { Sector } from 'lib/shared-domain/page/domain';
import React from 'react';
import { colors } from 'styles/foundations/colors';
import Image from 'next/image';
import Link from 'next/link';
import { P } from 'components/Typography/P';
import { sectionImages } from 'lib/shared-domain/page/presentation/contentModules/sectionImages';
import { links } from 'lib/links';
import { fontSizes } from 'styles/foundations/fontStyles';

const CARD_SIZE = 275;

const getBackgroundImage = (index: number): string => {
  return sectionImages?.sectorsSectionBg?.[index]?.src;
};

const getBackgroundPosition = (index: number): string => {
  return sectionImages?.sectorsSectionBg?.[index]?.bgPosition;
};

export const SectorCard: React.FC<{
  sector: Sector;
  index: number;
}> = ({ sector, index }) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  const isMobile = false;
  const { height, width } =
    sector?.graph?.iconImage?.asset?.metadata?.dimensions || {};
  const graphHeight = isMobile ? '60%' : height;
  const graphWidth = isMobile ? '60%' : width;
  return (
    <Link passHref href={links().sectors(sector)}>
      <Flex
        as="a"
        mb={{ base: 0, md: 1 }}
        mx="auto"
        position="relative"
        direction={{ base: 'row', md: 'column' }}
        h={{ base: 20, md: CARD_SIZE + 56 }}
        w="100%"
        border="1px solid #D2D2D2"
        p={2}
        justify={{ base: 'flex-start', md: 'flex-end' }}
        align={{ base: 'center', md: 'center' }}
        transition=".2s ease-in all"
        _hover={{
          boxShadow: colors.transactionsCardBoxShadow,
        }}
        cursor="pointer"
        backgroundImage={getBackgroundImage(index)}
        backgroundPosition={{
          base: getBackgroundPosition(index),
          md: 'center',
        }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        {sector?.graph?.iconImage?.asset?.url && (
          <Flex
            ml={isMobile && 'auto'}
            order={isMobile && 1}
            position={isMobile ? 'initial' : 'initial'}
            inset={!isMobile && 0}
          >
            {sector?.graph?.iconImage?.asset?.url && (
              <Image
                unoptimized
                src={sector?.graph?.iconImage?.asset?.url}
                alt={sector?.graph?.iconImage?.name}
                height={graphHeight}
                width={graphWidth}
              />
            )}
          </Flex>
        )}

        <Box maxWidth={isMobile && '70%'} width={isMobile && '70%'}>
          <P
            fontSize={sector.name.length > 20 ? fontSizes.p : fontSizes.h3}
            color={colors.primary.darkGreen}
            variant="sectorSectionP"
            lineHeight="24px"
          >
            {sector.name}
          </P>
        </Box>
      </Flex>
    </Link>
  );
};
