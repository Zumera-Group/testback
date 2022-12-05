import React from 'react';
import Image from 'next/image';

import { Box } from 'components/Layout/Flex/Flex';
import { DividerImageModule } from '../../domain/contentModule';
import { useBreakpointValue } from '@chakra-ui/react';

export const DividerImage: React.FC<{
  specificContentModule: DividerImageModule;
}> = ({ specificContentModule }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <Box height={isMobile ? 300 : 600} position="relative">
      <Image
        loading="lazy"
        unoptimized
        objectFit={'cover'}
        objectPosition="center"
        layout="fill"
        alt={''}
        src={specificContentModule.getImageUrl() + `?h=${isMobile ? 300 : 1200}`}
      />
    </Box>
  );
};

export default DividerImage;
