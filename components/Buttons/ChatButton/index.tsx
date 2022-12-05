import { Circle, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useIntercom } from 'react-use-intercom';
import { icons } from 'components/Icons';

import { colors } from 'styles/foundations/colors';

export const ChatButton = (): JSX.Element => {
  const { show } = useIntercom();
  return (
    <Circle
      size={{ base: 12, lg: 16 }}
      bg={colors.chatButtonBg}
      boxShadow="none"
      transition="box-shadow .2s ease"
      _hover={{ boxShadow: '0px 20px 40px rgba(12, 78, 64, 0.35)' }}
      cursor="pointer"
      onClick={show}
    >
      <IconButton
        _hover={{ background: 'transparent' }}
        display="flex"
        justify="center"
        align="center"
        variant="unstyled"
        aria-label="Chat"
        icon={<icons.User size="16px" />}
      />
    </Circle>
  );
};
