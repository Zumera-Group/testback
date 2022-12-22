import React from 'react';
import { CSSOthersObject } from '@emotion/react/node_modules/@emotion/serialize';
import { Box } from 'components/Layout/Flex/Flex';
import useBreakpointValue from 'lib/shared-domain/useBreakpoint';

type Space = '0' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const paddingForSpaceY: Record<Space, number> = {
  0: 0,
  xs: 4,
  sm: 6,
  md: 15, // had to change it to make the most common spacing between sections aligned as 15
  lg: 12,
  xl: 18,
  xxl: 19,
};

export const paddingForSpaceX: Record<Space, number> = {
  0: 0,
  xs: 3,
  sm: 6,
  md: 10,
  lg: 12,
  xl: 18,
  xxl: 19,
};

export const SectionContainer: React.FC<{
  py?: Space;
  pt?: Space;
  pb?: Space;
  px?: Space;
  style?: CSSOthersObject;
  classes?: string;
}> = ({ children, py, pt, pb, px, style, classes }) => {
  return (
    <Box
      style={style}
      mx="auto"
      width="100%"
      maxWidth="1240px"
      py={paddingForSpaceY[py]}
      pt={paddingForSpaceY[pt]}
      pb={paddingForSpaceY[pb]}
      px={paddingForSpaceX[px]}
      height="100%"
      className={`sectionContainer ${classes ?? ''}`}
    >
      {children}
    </Box>
  );
};

export const SectionContainerWithoutPyAndPb: React.FC<{
  py?: Space;
  pt?: Space;
  pb?: Space;
}> = ({ children, py, pt, pb }) => {
  // const isMobile = useBreakpointValue({ base: true, md: false });
  // const PADDING_X = isMobile ? paddingForSpaceX.xs : paddingForSpaceX.sm;
  return (
    <></>
    // <Box
    //   mx="auto"
    //   width="100%"
    //   maxWidth="1240px"
    //   py={isMobile ? null : paddingForSpaceY[py]}
    //   pt={isMobile ? paddingForSpaceX.xs : paddingForSpaceX[pt]}
    //   px={PADDING_X}
    //   height="100%"
    // >
    //   {children}
    // </Box>
  );
};
