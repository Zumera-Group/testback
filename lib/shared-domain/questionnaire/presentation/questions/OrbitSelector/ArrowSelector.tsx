import React, { ReactElement } from 'react';
// import { Box } from '@chakra-ui/react';
// import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import arrow from './icons/orbit-arrow.svg';

type ArrowSelectorType = (props: {
  orbitHeightInPx: number;
  sliderValue: number;
}) => ReactElement;

const ArrowSelector: ArrowSelectorType = ({ orbitHeightInPx, sliderValue }) => {
  return (
    <>
      <div>
        <div></div>
      </div>
    </>
  );
};

export default ArrowSelector;
