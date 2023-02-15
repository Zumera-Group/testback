import React from 'react';

import Link from 'next/link';
import { P } from 'components/Typography/P';
import { colors } from 'styles/foundations/colors';
import { fontSizes } from 'styles/foundations/fontStyles';
// import { Box, FlexRow } from 'components/Layout/Flex/Flex';
import { fontWeights } from '../../../../../styles/foundations/fontStyles';
// import { icons } from 'components/Icons';
import { useHover } from '../../../../hooks/useOnHover';
import { useLinkWithCurrentLocale } from 'lib/shared-domain/useLinkWithCurrentLocale';
//TODO: To delete
export const FakeLinkWithArrow: React.FC<{
  title: string;
  color?: string;
  fontWeight?: number;
}> = ({ title, color = colors.black, fontWeight }) => {
  const [ref, isHovered] = useHover();

  const getColor = () => {
    if (isHovered && color === colors.black) return colors.primary.darkGreen;
    return color || colors.text.regular;
  };
  return null;
  // return (
  //   <FlexRow
  //     ref={ref}
  //     cursor="pointer"
  //     display="inline-flex"
  //     alignItems="center"
  //     borderBottomStyle="solid"
  //     borderBottomColor={getColor()}
  //     borderBottomWidth="1px"
  //     pb={1}
  //     transition=".2s ease-in all"
  //     _hover={{
  //       transform: 'translateY(-2px)',
  //     }}
  //   >
  //     <P
  //       noOfLines={1}
  //       pr={1.5}
  //       fontWeight={fontWeight || fontWeights.semiBold}
  //       fontSize={fontSizes.small}
  //       color={getColor()}
  //       textTransform="capitalize"
  //     >
  //       {title}
  //     </P>
  //     <icons.LinkArrow color={getColor()} />
  //   </FlexRow>
  // );
};

export const LinkWithArrow: React.FC<{
  title: string;
  href: string;
  color?: string;
  fontWeight?: number;
}> = ({ title, href, color = colors.black, fontWeight }) => {
  const linkWithCurrentLocale = useLinkWithCurrentLocale();
  return null;
  // return (
  //   <Link passHref href={linkWithCurrentLocale(href)}>
  //     <Box as="a">
  //       <FakeLinkWithArrow
  //         fontWeight={fontWeight}
  //         color={color}
  //         title={title}
  //       />
  //     </Box>
  //   </Link>
  // );
};
