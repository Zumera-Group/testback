import {
  Box as BoxBase,
  Flex as FlexBase,
  FlexProps,
  BoxProps,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
export const Box: React.FC<BoxProps & { ref?: any }> = BoxBase;
export const FlexRow: React.FC<FlexProps & { ref?: any }> = styled(FlexBase)`
  flex-direction: row;
`;
export const FlexCol: React.FC<FlexProps & { ref?: any }> = styled(FlexBase)`
  flex-direction: column;
`;
export const FlexAllCenter: React.FC<FlexProps & { ref?: any }> = styled(
  FlexBase,
)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;
export const FlexCenterPage: React.FC<{ maxWidth?: string | number }> = ({
  children,
  maxWidth,
}) => {
  return (
    <FlexAllCenter>
      <FlexAllCenter maxWidth={maxWidth} textAlign="center">
        {children}
      </FlexAllCenter>
    </FlexAllCenter>
  );
};
