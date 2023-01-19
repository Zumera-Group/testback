import React from 'react';
import { Box } from '@chakra-ui/react';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import arrow from './icons/orbit-arrow.svg';

type ArrowSelectorType = (props: {
  orbitHeightInPx: number;
  sliderValue: number;
}) => ReactJSXElement;

const ArrowSelector: ArrowSelectorType = ({ orbitHeightInPx, sliderValue }) => {
  return (
    <>
      <Box
        position="relative"
        bg={`linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)`}
        width={'315px'}
        height="2px"
        bottom={-(orbitHeightInPx - 3) + 'px'}
        ml={'-15px'}
        transform={`rotate(${sliderValue}deg)`}
        transformOrigin="right"
        transition="transform 0.3s"
      >
        <Box
          width="20px"
          height="18px"
          mt="-10px"
          ml={'-25px'}
          bgImage={`url(${arrow?.src})`}
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          opacity="1"
          display="table-caption"
          transform="rotate(255deg)"
        ></Box>
      </Box>
    </>
  );
};

export default ArrowSelector;
