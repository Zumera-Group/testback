import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { colors } from 'styles/foundations/colors';

interface Props {
  title: string;
}

export const TimeEstimationBox: React.FC<Props> = ({ title }) => {
  return (
    <Box
      ml="auto"
      maxWidth={250}
      height={75}
      mr={-3}
      bgColor="estimationBoxBg"
      px={3}
      py={2}
      mt={-3}
    >
      <Text
        variant="pSemiBold"
        color={colors.primary.darkGreen}
        fontSize="small"
      >
        {title}
      </Text>
    </Box>
  );
};
