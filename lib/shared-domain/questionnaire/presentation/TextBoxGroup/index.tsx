// import { Circle, Flex, Box } from '@chakra-ui/react';
// import { icons } from 'components/Icons';
import { P } from 'components/Typography/P';
import React from 'react';
import { colors } from 'styles/foundations/colors';

interface Props {
  text: string;
  color?: {
    circleBgColor?: string;
    tickColor?: string;
    textColor?: string;
  };
  border?: string;
  size?: number;
}

export const TextBoxGroup: React.FC<Props> = ({
  text,
  color,
  border,
  size,
}) => {
  return null;
  // return (
  //   <Flex alignItems="center">
  //     <Circle
  //       size={size || 10}
  //       bg={color.circleBgColor || colors.white}
  //       border={border || 'none'}
  //     >
  //       <icons.Tick color={color.tickColor || colors.primary.lightGreen} />
  //     </Circle>
  //     <Box ml={2}>
  //       <P color={color.textColor || colors.primary.darkGreen}>{text}</P>
  //     </Box>
  //   </Flex>
  // );
};
