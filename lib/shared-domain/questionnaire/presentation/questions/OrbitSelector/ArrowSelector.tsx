import React from 'react';
import { Box } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import arrow from './icons/arrow.svg';

type ArrowSelectorType = (props: {
  orbitHeightInPx: number;
  sliderValue: number;
}) => ReactJSXElement;

const ArrowSelector: ArrowSelectorType = ({ orbitHeightInPx, sliderValue }) => {
  return (
    <>
      <Box
        position="relative"
        bg={`linear-gradient(90deg,#000000c4, transparent)`}
        width={orbitHeightInPx + 'px'}
        height="3px"
        bottom={-(orbitHeightInPx - 3) + 'px'}
        ml={-(orbitHeightInPx - 3) + 'px'}
        transform={`rotate(${sliderValue}deg)`}
        transformOrigin="right"
        transition="transform 0.3s"
      >
        <Box
          width="15px"
          height="15px"
          mt="-6px"
          ml={-(orbitHeightInPx + 25) + 'px'}
          bgImage={`url(${arrow?.src})`}
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          opacity="1"
          display="table-caption"
          transform="rotate(225deg)"
        ></Box>
      </Box>
    </>
  );
};

export default ArrowSelector;
